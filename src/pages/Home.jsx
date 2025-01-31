import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Carousel from "../components/swiper/Carousel";
import VolunteerNeeds from "../components/VolunteerNeeds";

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <VolunteerNeeds></VolunteerNeeds>
            <Contact></Contact>
            <Faq></Faq>
        </div>
    );
};

export default Home;