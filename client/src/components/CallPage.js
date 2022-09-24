import './CallPage.css';
import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import CallPageFooter from './UI/CallPageFooter/CallPageFooter';
import CallPageHeader from './UI/CallPageHeader/CallPageHeader';
import Messenger from './UI/Messenger/Messenger';
import MeetingInfo from './UI/MeetingInfo/MeetingInfo';
import MessageListReducer from '../reducers/MessageListReducer';
import Peer from 'simple-peer'
import io from 'socket.io-client'
import {getRequest,postRequest} from "../utils/apiRequest"
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "../utils/apiEndpoints";
let peer = null;
const socket =io.connect("http://localhost:3000/")
const initialState = [];
const CallPage = () => {
    const history = useHistory();
    let { id } = useParams();
    const isAdmin = window.location.hash === "#init" ? true : false;
    const url=`${window.location.origin}${window.location.pathname}`
    let alertTimeout = null;
    
     const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );
   
      const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
   
   useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
       }
       initWebRTC();
       socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
   }, []);
    
     const getRecieverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };
    

    const initWebRTC = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            }).then((stream) => {
                peer = new Peer({
                    initiator: isAdmin,
                    trickle: false,
                    stream: stream
                })

                 if (!isAdmin) {
          getRecieverCode();
        }
                peer.on("signal", async (data) => {
                    if (isAdmin) {
                        let payload = {
                            id, signalData: data,
                        };
                        await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
                    } else {
                        socket.emit("code", { code: data, url }, (cbData) => {
                            console.log("code sent");
                        });
                    }
                })
                 peer.on("connect", () => {
          // wait for 'connect' event before using the data channel
        });
        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          let video = document.querySelector("video");

          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }

          video.play();
        })
                .catch(() => { });
            });
       
    }
    
    
    
    return (
        <div className="callpage-container">
            <video className="video-container" src="" controls></video>
            <CallPageHeader />
            <CallPageFooter />
            {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
            
            <Messenger/>
        </div>
    )
}

export default CallPage;