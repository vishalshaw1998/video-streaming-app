import VideoCard from "./VideoCard";
import CardContainer from "./CardContainer";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

const ListVideos = ({ videos }) => {
    let arrayOfVideos = [];
    let threeMoviesArr = [];
    for (let i = 0; i < videos.length; i++) {
        if (i % 2 === 0 && i !== 0) {
            threeMoviesArr.push(videos[i]);
            arrayOfVideos.push([...threeMoviesArr]);
            threeMoviesArr = [];
            continue;
        }
        threeMoviesArr.push(videos[i]);
    }
    arrayOfVideos.push(threeMoviesArr);
    let videoCards = [];
    for (let i = 0; i < arrayOfVideos.length; i++) {
        const temp = arrayOfVideos[i].map(({ _id, duration, name, poster }) => {
            return (
                <VideoCard
                    key={_id}
                    id={_id}
                    duration={duration}
                    name={name}
                    poster={poster}
                />
            );
        });
        videoCards.push(temp);
    }
    return (
        <>
            <div style={{ display: "flex", marginTop: "20px" }}>
                <div style={{ width: "20%" }}>
                    <Link to="/">
                        <Button btnStyle="btn_back">Go Back</Button>
                    </Link>
                </div>
                <div
                    style={{
                        width: "80%",
                        textAlign: "center",
                        fontFamily: "Goldman",
                        fontSize: "30px",
                    }}
                >
                    Please Select The Video From List
                </div>
            </div>
            <div>
                {videoCards.map((cards, idx) => {
                    return <CardContainer key={idx}>{cards}</CardContainer>;
                })}
            </div>
        </>
    );
};

export default ListVideos;
