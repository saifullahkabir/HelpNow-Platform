import { Link, useLoaderData } from "react-router-dom";
// for animation
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

const VolunteerDetails = () => {
    const volunteerNeed = useLoaderData();
   
    const {
        _id,
        thumbnail,
        postTitle,
        description,
        category,
        volunteersNeeded,
        location,
        deadline,
    } = volunteerNeed;
    
    return (
        <div data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="500" className="pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24">
            <div className="mb-4 lg:mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center ">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <img className="object-cover h-8 lg:h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="User photo" />

                            <div className="flex flex-col ">
                                <a href="#" className=" font-semibold  text-gray-800 text-sm lg:text-base" tabIndex={0} role="link">Saifullah Kabir Rana</a>
                                <span className=" text-xs lg:text-sm text-gray-600 ">21 SEP 2015</span>
                            </div>
                        </div>

                    </div>
                    <div className="px-3 py-2  bg-[#a8abff4b] border-none text-[#797DFC] font-medium rounded-3xl">
                        <p className="text-[8px] md:text-xs ">Volunteers needed: {volunteersNeeded}</p>
                    </div>
                </div>
            </div>
            <div className="card sm:card-side bg-base-100 shadow-xl ">
                <figure className="sm:w-1/3 xl:w-2/5">
                    <img
                        className="w-full h-full"
                        src={thumbnail}
                        alt="Album" />
                </figure>
                <div className="md:card-body p-4 md:p-8 xl:p-16 sm:w-2/3 xl:w-3/5 ">
                    <div className="flex justify-between mt-2">
                        <span className="text-xs md:text-sm font-medium text-[#797DFC] uppercase ">{category}</span>
                        <span className="text-xs md:font-sm lg:text-base font-medium text-gray-700">Deadline: {deadline}</span>
                    </div>
                    <h2 className="card-title mt-3 md:mt-1 text-xl xl:text-2xl font-semibold text-gray-800">{postTitle}</h2>
                    <p className="text-sm lg:text-base text-gray-500 xl:w-[60%] mt-2 ">{description}</p>
                    <p className="text-base lg:text-lg text-gray-700 mt-3">Location: {location}</p>

                    <div className="card-actions justify-end  mt-6 mb-4 md:mb-0">
                        <Link className="btn-sm lg:btn-md btn  bg-[#797DFC] hover:bg-[#888cfcc0] text-white ">
                            <button className=" xl:px-4  font-bold text-sm lg:text-base ">Be a Volunteer</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDetails;