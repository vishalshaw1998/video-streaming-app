import "../styles/App.css";
import { Route } from "react-router-dom";
import Home from "./Home";
import ListVideos from "./ListVideos";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";

function App() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetch("/videos")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setVideos(data.videos);
            });
    }, []);
    return (
        <div className="container">
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/listVideo">
                <ListVideos videos={videos} />
            </Route>
            <Route exact path="/play/:id">
                <VideoPlayer />
            </Route>
        </div>
    );
}

export default App;
