import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import shortid from "shortid"
import Header from "./UI/Header/Header";
const HomePage = () => {
const history = useHistory();
     const startCall = () => {
    const uid = shortid.generate();
    history.push(`/${uid}#init`);
  };
    return (
        <div className="home-page">
            <Header />
            
            <div className="body">
                
                <div className="left-side">
                    <div className="content"><h2>Premium video meetings.
                        Now free for everyone.</h2>
                    <p>We re-engineered the service we built for secure business meetings, Google Meet, to make it free and available for all.</p>
                
                <div className="action-btn">
                    <button className="btn green" onClick={startCall}>
                        <FontAwesomeIcon className="icon-block" icon={faVideo} />
                        New Meeting
                    </button>
                    
                    <div className="input-block">
                        <div className="input-section">
                            <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                            <input type="text" placeholder="Enter a code or link" />
                        </div>
                        <button className="btn no-bg">Join</button>
                    </div>
                        </div>
                        </div>
                    <div className="help-text">
                        <a href="">Learn more</a> About Babu Shona Meet
                    </div>
                    </div>
                <div className="right-side">
                    <div className="content">
                        <img src="https://www.lovesove.com/wp-content/uploads/2017/03/Cute-Anime-Couple-Love-Wallpaper-LoveSove.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;