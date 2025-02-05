import useAuth from '../hooks/useAuth';
import useAxiosCommon from '../hooks/useAxiosCommon';
import { MdDeleteOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import noData from '../assets/noData.gif'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const ManageMyPosts = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const getData = async () => {
        const { data } = await axiosCommon(`/volunteerNeeds/${user?.email}`);
        return (Array.isArray(data) ? data : []);

    }

    // using tanstack query
    const {
        data: volunteerNeeds = [],
        isLoading,
        refetch,
    } = useQuery({
        queryFn: getData,
        queryKey: ['volunteerNeeds', user?.email]
    })
    console.log(volunteerNeeds);

    // delete my post
    const handleDelete = async id => {
        // Confirmation Popup
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#29B170",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        // if the user confirms, it will be deleted
        if (result?.isConfirmed) {
            try {
                const response = await axiosCommon.delete(`/volunteerNeed/${id}`);

                if (response.data.deletedCount > 0) {
                    // ui update
                    refetch();
                    // Success Message
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#29B170"
                    });

                }

            }
            catch (err) {
                console.log('Delete failed:', err);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }
        }
    }

    if (isLoading) {
        return <div className="flex justify-center mt-48 md:mt-60 xl:mt-72">
            <span className="loader2"></span>
        </div>
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
                                                        <Link to={`/update-post/${volunteerNeed._id}`}>
                                                            <BiEdit className='focus:text-[#797DFC] hover:text-[#797DFC] ' />
                                                        </Link>
                                                        <MdDeleteOutline onClick={() => handleDelete(volunteerNeed._id)} className='focus:text-red-600 hover:text-red-600' />
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
                            <div className='flex justify-center '>
                                {/* <img className='w-[400px]' src={noData} alt="" /> */}
                                <DotLottieReact 
                                className='rounded-full w-[700px] '
                                    src="https://lottie.host/d1cb8cc5-979f-4f7c-8733-8c32f07f0e42/rWru8w7Q6z.lottie"
                                    loop
                                    autoplay
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default ManageMyPosts;