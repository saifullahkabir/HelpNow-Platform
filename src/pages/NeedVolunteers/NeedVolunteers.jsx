import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import CardLayout from "./CardLayout";

const NeedVolunteers = () => {
    const axiosCommon = useAxiosCommon();

    const getData = async () => {
        const { data } = await axiosCommon(`/volunteerNeeds`);
        return (Array.isArray(data) ? data : []);
    }

    const {
        data: volunteerNeeds = [],
        isLoading,
        refetch
    } = useQuery({
        queryFn: getData,
        queryKey: ['volunteerNeeds']
    })

    const handleSearch = () => {

    }


    if (isLoading) {
        return <div className="flex justify-center mt-48 md:mt-60 xl:mt-72">
            <span className="loader2"></span>
        </div>
    }
    return (
        <div className="pt-24 md:pt-24 lg:pt-28 xl:pt-32 pb-10 md:pb-14 xl:pb-24">
            <div className="flex justify-center">
                <form
                    onSubmit={handleSearch}
                    className="min-w-[275px] md:min-w-[320px] text-sm md:text-base">
                    <div className=' flex p-1 overflow-hidden border rounded-lg  focus-within:ring focus-within:ring-opacity-40 focus-within:border-gray-400 focus-within:ring-gray-300 '>
                        <div className="flex items-center text-xl px-1 md:px-2">
                            <CiSearch className="font-bold" />
                        </div>
                        <input
                            className='px-2 md:px-3 py-2 text-gray-700 placeholder-gray-500  outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'

                            placeholder='Enter Post Title'
                            aria-label='Enter Post Title'
                        />

                        <button className='px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm  tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#797DFC] rounded-md hover:bg-[#888cfcc0] focus:bg-[#888cfcc0] focus:outline-none font-semibold'>
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="pt-8 md:pt-10 lg:pt-12 xl:pt-14">
                
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-8 xl:gap-8 2xl:gap-12  ">
                {
                    volunteerNeeds
                    .map(volunteerNeed => <CardLayout
                    key={volunteerNeed._id}
                    volunteerNeed={volunteerNeed}
                    ></CardLayout> )
                }
            </div>
            </div>
        </div>
    );
};

export default NeedVolunteers;