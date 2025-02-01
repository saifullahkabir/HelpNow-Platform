import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div className="font-lato">
            <div className="md:container md:mx-auto px-6 md:px-12 lg:px-20 xl:px-0">
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-350px)]">
                <Outlet></Outlet>
            </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;