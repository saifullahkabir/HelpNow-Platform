import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosCommon from '../hooks/useAxiosCommon';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

const ManageMyPosts = () => {
    const { user } = useAuth();
    const [volunteerNeeds, setVolunteerNeeds] = useState([]);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        getData();
    }, [user])

    const getData = async () => {
        const { data } = await axiosCommon(`/volunteerNeeds/${user?.email}`);
        setVolunteerNeeds(data);
    }
    return (
        <div className="pt-24 lg:pt-24 xl:pt-28 pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24">
            <div className="-mx-2 md:-mx-0 dark:text-gray-800">
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className=" text-lg md:text-xl  font-semibold leading-tight">My Need Volunteers</h2>
                    <span className='px-3 py-1 text-xs md:text-sm bg-[#a8abff4b]  text-[#797DFC] rounded-full '>
                        {volunteerNeeds?.length} Post
                    </span>
                </div>
                {
                    volunteerNeeds?.length > 0 ? <>
                        <div className="overflow-x-auto rounded-lg shadow-sm">
                            <table className=" min-w-full text-xs lg:text-sm">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col className="w-24" />
                                </colgroup>
                                <thead className="bg-gray-100">
                                    <tr className="text-left">
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Deadline</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3 whitespace-nowrap">No. of volunteers</th>
                                        <th className="px-4 py-3 ">Category</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        volunteerNeeds.map(volunteerNeed =>
                                            <tr
                                                key={volunteerNeed._id}
                                                className="border-b border-opacity-20 hover:border-gray-300 hover:bg-gray-50 text-gray-500 font-normal">
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{volunteerNeed.postTitle}</p>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{new Date(volunteerNeed.deadline).toLocaleDateString()}</p>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{volunteerNeed.location}</p>

                                                </td>
                                                <td className="px-12 py-3 whitespace-nowrap ">
                                                    <p>{volunteerNeed.volunteersNeeded}</p>

                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{volunteerNeed.category}</p>
                                                </td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <div className='flex items-center gap-3 md:gap-4 lg:gap-5  text-xl '>
                                                        <BiEdit className='focus:text-[#797DFC] hover:text-[#797DFC] ' />
                                                        <MdDeleteOutline className='focus:text-red-600 hover:text-red-600' />
                                                    </div>
                                                </td>
                                            </tr>
                                        )

                                    }

                                </tbody>
                            </table>
                        </div>
                    </>
                        :
                        <>
                            <div>
                                <h2 className='text-3xl text-center py-52'>Data Not Found</h2>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default ManageMyPosts;