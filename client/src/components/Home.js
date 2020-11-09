import { Link } from "react-router-dom";
import "../styles/Home.css";
import Button from "../utils/Button";
const Home = () => {
    return (
        <div className="container_home">
            <div className="welcome_tag">
                <h1>Welcome to the Video Streaming App</h1>
            </div>
            <div className="img_container">
                <i className="massive play icon"></i>
            </div>
            <Link to="/listVideo">
                <Button btnStyle="home_exploreButton">Explore</Button>
            </Link>
        </div>
    );
};

export default Home;
