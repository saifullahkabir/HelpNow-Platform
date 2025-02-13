import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import CardLayout from "./CardLayout";
import { LuLayoutGrid, LuTableOfContents } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableLayout from "./TableLayout";

const NeedVolunteers = () => {
    const axiosCommon = useAxiosCommon();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [tableView, setTableView] = useState(false);


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

    useEffect(() => {
        const getSearchData = async () => {
            if (!search.trim()) {
                setSearchResult([]); // Reset search result if empty
                return;
            }

            try {
                const { data } = await axiosCommon(`/searchPosts?search=${search}`);
                setSearchResult(data);
            }
            catch (err) {
                toast.error("Search failed:", err)
            }
        }
        getSearchData();
    }, [search, axiosCommon])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(search);
    }

    const handleReset = () => {
        setSearch('');
        setSearchResult([]);
    }

    // Load layout from Local Storage on first render
    useEffect(() => {
        const saveLayout = localStorage.getItem('layout');
        if(saveLayout === 'table'){
            setTableView(true);
        }
    }, [])

    // Function to toggle layout and store it in Local Storage
    const toggleLayout = () => {
        const newLayout = !tableView;
        setTableView(newLayout);
        localStorage.setItem("layout", newLayout ? 'table' : 'grid');
    }

    if (isLoading) {
        return <div className="flex justify-center mt-48 md:mt-60 xl:mt-72">
            <span className="loader2"></span>
        </div>
    }

    const dataToShow = search ? searchResult : volunteerNeeds;

    return (
        <div className="pt-24 md:pt-24 lg:pt-28 xl:pt-32 pb-10 md:pb-14 xl:pb-24">
            <div className="flex  justify-center items-center gap-3 md:gap-4">
                <form
                    onSubmit={handleSearch}
                    className="min-w-[250px] md:min-w-[320px] text-sm md:text-base">
                    <div className=' flex p-1 overflow-hidden border rounded-lg  focus-within:ring focus-within:ring-opacity-40 focus-within:border-gray-400 focus-within:ring-gray-300 '>
                        <div className="flex items-center text-xl px-1 md:px-2">
                            <CiSearch className="font-bold" />
                        </div>
                        <input
                            className='px-1 md:px-3 py-2 text-gray-700 placeholder-gray-500  outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search by Post Title...'
                            aria-label='Search by Post Title...'
                        />

                        <button
                            type="submit"
                            className='px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm  tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-[#797DFC] rounded-md hover:bg-[#888cfcc0] focus:bg-[#888cfcc0] focus:outline-none font-semibold'>
                            Search
                        </button>
                    </div>
                </form>
                {/* Reset Button */}
                <div>
                    <button onClick={handleReset} className="btn btn-sm md:btn-md">
                        <RiResetLeftLine className="text-sm md:text-lg " />
                    </button>
                </div>
            </div>
            {/* Layout Button */}
            <div className="flex justify-end pt-5 md:pt-7 lg:pt-9 xl:pt-11">
                <label htmlFor="Toggle3" className="inline-flex items-center  cursor-pointer  shadow-xl rounded-lg">
                    <input
                        id="Toggle3"
                        type="checkbox"
                        className="hidden peer"
                        onChange={toggleLayout}
                        checked={tableView}
                    />
                    <span className="px-3 md:px-4 py-2  rounded-l-lg  bg-[#797DFC] peer-checked:bg-gray-100">
                        <LuLayoutGrid className="text-base md:text-xl  text-black " />
                    </span>
                    <span className="px-3 md:px-4 py-2  rounded-r-lg bg-gray-100  peer-checked:bg-[#797DFC]">
                        <LuTableOfContents className="text-base md:text-xl  text-black" />
                    </span>
                </label>
            </div>

            <div className="pt-3 md:pt-5 lg:pt-6 xl:pt-8">
                {

                    tableView ?
                        <TableLayout dataToShow={dataToShow}></TableLayout>
                        :
                        dataToShow.length > 0 ?
                            (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-8 xl:gap-8 2xl:gap-12  ">
                                    {
                                        dataToShow.map(volunteerNeed => <CardLayout
                                            key={volunteerNeed._id}
                                            volunteerNeed={volunteerNeed}
                                        ></CardLayout>)
                                    }
                                </div>
                            )
                            :
                            (

                                <div>
                                    <p className="text-center py-4 text-lg text-gray-500">No Data Found</p>
                                </div>
                            )
                }

            </div>
        </div>
    );
};

export default NeedVolunteers;