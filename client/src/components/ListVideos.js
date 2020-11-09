import VideoCard from "./VideoCard";
import CardContainer from "./CardContainer";

const ListVideos = ({ videos }) => {
    let arrayOfVideos = [];
    let threeMoviesArr = [];
    for (let i = 0; i < videos.length; i++) {
        if (i % 2 == 0 && i !== 0) {
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
        const temp = arrayOfVideos[i].map(({ id, duration, name, poster }) => {
            return (
                <VideoCard
                    id={id}
                    duration={duration}
                    name={name}
                    poster={poster}
                />
            );
        });
        videoCards.push(temp);
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Please Select from the list of Videos To Watch
            </h1>
            {videoCards.map((cards) => {
                return <CardContainer>{cards}</CardContainer>;
            })}
        </div>
    );
};

export default ListVideos;
