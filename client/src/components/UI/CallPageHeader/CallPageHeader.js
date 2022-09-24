import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import './CallPageHeader.css';

const CallPageHeader = () => {
    return (
        <>
            <div className="frame-header">
                <div className="header-items icon-block">
                    <FontAwesomeIcon className="icon" icon={faUserFriends}/>
                </div>
                <div className="header-items icon-block">
                    <FontAwesomeIcon className="icon" icon={faCommentAlt} />
                    <span className="alert-circle-icon"></span>
                </div>
                <div className="header-items date-block">
                    1:00 pm
                </div>
                <div className="header-items icon-block">
                    <FontAwesomeIcon className="icon profile" icon={faUserCircle}/>
                </div>
            </div>

        </>
    )
}
export default CallPageHeader;