import Contact from "../components/Contact";
import Carousel from "../components/swiper/Carousel";
import VolunteerNeeds from "../components/VolunteerNeeds";

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <VolunteerNeeds></VolunteerNeeds>
            <Contact></Contact>
        </div>
    );
};

export default Home;