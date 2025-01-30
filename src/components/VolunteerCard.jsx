
const VolunteerCard = ({ volunteerNeed }) => {
    const {
        _id,
        thumbnail,
        postTitle,
        description,
        category,
        volunteersNeeded,
        deadline
    } = volunteerNeed;
    return (
        <div className="font-lato">
            <div className="flex flex-col h-full">
                <div className="max-w-2xl h- overflow-hidden  rounded-lg shadow-md flex flex-col h-full">
                    <img className="object-cover w-full h-48 md:h-56 lg:h-60 xl:h-64" src={thumbnail} alt="thumbnail" />

                    <div className="p-4 lg:p-6 ">
                        <div className="">
                            <div className="flex justify-between">
                            <span className="text-xs font-medium text-[#797DFC] uppercase ">{category}</span>
                            <span className="text-xs lg:text-sm font-medium text-gray-700">Deadline: {deadline}</span>
                            </div>
                            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:text-gray-600  hover:underline flex-grow" tabIndex={0} role="link">{postTitle}</a>
                            <p className="mt-2 text-sm text-gray-600 flex-grow">{description}</p>
                        </div>

                        <div className="mt-4 lg:mt-6 flex justify-between items-center">
                            <div className="flex items-center ">
                                <div className="flex items-center gap-2 lg:gap-4">
                                    <img className="object-cover h-8 lg:h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="User photo" />

                                    <div className="flex flex-col ">
                                        <a href="#" className=" font-semibold  text-gray-800 text-sm lg:text-base" tabIndex={0} role="link">Saifullah Kabir Rana</a>
                                        <span className=" text-xs lg:text-sm text-gray-600 ">21 SEP 2015</span>
                                    </div>
                                </div>

                            </div>
                            <div className="hover:text-[#797DFC] hover:underline hover:cursor-pointer text-sm lg:text-base ">
                                View details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerCard;