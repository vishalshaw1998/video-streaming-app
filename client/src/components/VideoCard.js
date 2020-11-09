import "../styles/VideoCard.css";
import { Link } from "react-router-dom";
const VideoCard = ({ id, poster, name, duration }) => {
    return (
        <div className="videocard">
            <Link to={`/play/${id}`}>
                <img
                    className="videocard_image"
                    src={poster}
                    alt="poster video"
                />
            </Link>
            <div className="content">
                <div>
                    <span className="title">{name}</span>
                </div>
                <div>
                    <span>Duration:- {duration}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
