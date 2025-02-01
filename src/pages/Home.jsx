import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Carousel from "../components/swiper/Carousel";
import VolunteerNeeds from "../components/VolunteerNeeds";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return <div className="flex justify-center mt-60 md:mt-72 xl:mt-96">
            <span className="loader"></span>
        </div>
    }
    
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