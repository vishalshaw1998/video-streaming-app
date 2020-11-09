import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const VideoPlayer = ({ maxId }) => {
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    const isCorrectUrl = id > maxId || id < 0 ? false : true;
    useEffect(() => {
        if (isCorrectUrl) {
            fetch(`http://localhost:5000/${id}/data`)
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
                    <h1>Please Wait</h1>
                </div>
            )}
            {!loading && (
                <video controls muted autoPlay crossOrigin="anonymous">
                    <source
                        src={`http://localhost:5000/video/${id}`}
                        type="video/mp4"
                    ></source>
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;
