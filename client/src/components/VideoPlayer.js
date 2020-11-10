import { useEffect, useState } from "react";
import "../styles/VideoPlayer.css";
import Button from "../utils/Button";
import { Link, useHistory, useParams } from "react-router-dom";

const VideoPlayer = ({ maxId }) => {
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    const isCorrectUrl = id > maxId || id < 0 ? false : true;
    useEffect(() => {
        if (isCorrectUrl) {
            fetch(`/api/${id}/data`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setVideoData(data.videoData);
                    setLoading(false);
                });
        } else {
            history.push("/");
        }
    }, [id, isCorrectUrl, history]);
    return (
        <div>
            {loading && (
                <div>
                    <h1 style={{ textAlign: "center" }}>Please Wait</h1>
                </div>
            )}
            {!loading && (
                <div className="video_container">
                    <div>
                        <video
                            className="videoPlayer"
                            controls
                            muted
                            autoPlay
                            crossOrigin="anonymous"
                        >
                            <source
                                src={`/api/video/${id}`}
                                type="video/mp4"
                            ></source>
                        </video>
                    </div>
                    <div className="video_details">
                        <div className="current_name">{videoData.name}</div>
                        <div>
                            <Link to="/listVideo">
                                <Button btnStyle="btn_back">Back</Button>
                            </Link>
                        </div>
                        <div className="current_duration">
                            {videoData.duration}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
