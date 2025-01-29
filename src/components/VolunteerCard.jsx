
const VolunteerCard = () => {
    return (
        <div className="font-lato">
            
            <div>
                <div className="max-w-lg overflow-hidden  rounded-lg shadow-md ">
                    <img className="object-cover w-full h-48 md:h-56 lg:h-60 xl:h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="thumbnail" />

                    <div className="p-4 lg:p-6">
                        <div>
                            <span className="text-xs font-medium text-[#797DFC] uppercase ">Product</span>
                            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:text-gray-600  hover:underline" tabIndex={0} role="link">I Built A Successful Blog In One Year</a>
                            <p className="mt-2 text-sm text-gray-600 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.</p>
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
                            <div className="hover:text-[#797DFC] hover:underline hover:cursor-pointer text-sm lg:text-base">
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