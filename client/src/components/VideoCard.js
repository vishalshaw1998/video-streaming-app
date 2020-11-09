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
            <div>
                <span>Title:- {name}</span>
            </div>
        </div>
    );
};

export default VideoCard;
