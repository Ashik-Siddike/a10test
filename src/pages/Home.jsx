import Banner from "../components/home/Banner";
import HowItWorks from "../components/home/HowItWorks";
import SuccessStories from "../components/home/SuccessStories";
import RunningCampaigns from "../components/home/RunningCampaigns";

const Home = () => {
    return (
        <div>
            <Banner />
            <RunningCampaigns />
            <HowItWorks />
            <SuccessStories />
        </div>
    );
};

export default Home;