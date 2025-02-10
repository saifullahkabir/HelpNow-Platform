import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdCancel } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyVolunteerRequests = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const getData = async () => {
        const { data } = await axiosCommon(`/my-request/${user?.email}`);
        return (Array.isArray(data) ? data : []);
    }

    const {
        data: myRequests = [],
        isLoading,
        refetch
    } = useQuery({
        queryFn: getData,
        queryKey: ['myRequests', user?.email]
    })
    console.log('My requests:', myRequests);

    if (isLoading) {
        return <div className="flex justify-center mt-48 md:mt-60 xl:mt-72">
            <span className="loader2"></span>
        </div>
    }

    return (
        <div className=" pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24">
            <div className="-mx-2 md:-mx-0 opacity-95">
                <div className="flex items-center gap-x-3 mb-4">
                    <h2 className=" text-lg md:text-xl  font-semibold leading-tight">My Volunteer Request</h2>
                    <span className='px-3 py-1 text-xs md:text-sm bg-[#a8abff4b]  text-[#797DFC] rounded-full '>
                        {myRequests?.length} Post
                    </span>
                </div>
                {
                    myRequests?.length > 0 ? <>
                        <div className="overflow-x-auto rounded-lg shadow-sm border">
                            <table className=" min-w-full text-xs lg:text-sm ">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col className="w-24" />
                                </colgroup>
                                <thead className=" bg-gray-100">
                                    <tr className="text-left opacity-75 text-black">
                                        <th className="px-4 py-3">Organizer</th>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">deadline</th>
                                        <th className="px-4 py-3 ">category</th>
                                        <th className="px-4 py-3 ">Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myRequests.map(myRequest =>
                                            <tr
                                                key={myRequest._id}
                                                className="border-b border-opacity-20 hover:border-gray-300 hover:bg-gray-50 hover:bg-opacity-90 opacity-90 hover:opacity-85 font-normal hover:text-black">
                                                <td className="px-4 py-3 pr-10 lg:pr-0">
                                                    <Link to={`/volunteerNeed/${myRequest.
                                                volunteerId}`}>
                                                    <div className="flex items-center ">
                                                        <div className="flex items-center gap-2 lg:gap-3">
                                                            <img className="object-cover h-8 lg:h-9 rounded-full" src={myRequest?.organizer?.photo} alt="User photo" />

                                                            <div className="flex flex-col ">
                                                                <p  className=" font-semibold opacity-95 text-sm lg:text-base hover:link hover:font-semibold" tabIndex={0} role="link">{myRequest?.organizer?.name}</p>
                                                                <span className=" text-xs lg:text-sm opacity-80 font-lato">{myRequest?.organizer?.email}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <Link to={`/volunteerNeed/${myRequest.
                                                volunteerId}`} 
                                                className="hover:link hover:font-semibold"
                                                >
                                                    <p>{myRequest.postTitle}</p>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{new Date(myRequest.deadline).toLocaleDateString()}</p>

                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap ">
                                                    <p>{myRequest.category}</p>

                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <p>{myRequest.status}</p>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <button className=" btn btn-sm btn-circle text-xl lg:text-2xl text-red-600">
                                                        <MdCancel />
                                                    </button>
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

export default MyVolunteerRequests;