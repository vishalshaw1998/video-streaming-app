import "../styles/VideoCard.css";
const VideoCard = ({ id, poster, name, duration }) => {
    return (
        <div className="videocard">
            <img className="videocard_image" src={poster} alt="poster video" />
            <div>
                <span>Title:- {name}</span>
            </div>
        </div>
    );
};

export default VideoCard;
