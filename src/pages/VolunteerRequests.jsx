import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

const VolunteerRequests = () => {
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const getData = async () => {
        const { data } = await axiosCommon(`/volunteer-requests/${user?.email}`)
        return (Array.isArray(data) ? data : []);

    }

    const {
        data: requests = [],
        isLoading,

    } = useQuery({
        queryFn: getData,
        queryKey: ['requests', user?.email]
    })
    console.log(requests, 'data');


    return (
        <div>
            <div className=" pt-24 lg:pt-24 xl:pt-28 pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24 ">
                <div className="-mx-2 md:-mx-0 opacity-95">
                    <div className="flex items-center gap-x-3 mb-4">
                        <h2 className=" text-lg md:text-xl  font-semibold leading-tight">Volunteer Requests</h2>
                        <span className='px-3 py-1 text-xs md:text-sm bg-[#a8abff4b]  text-[#797DFC] rounded-full '>
                            {requests?.length} Post
                        </span>
                    </div>

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
                                    <th className="px-4 py-3">Volunteer</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">deadline</th>
                                    <th className="px-4 py-3 ">category</th>
                                    <th className="px-4 py-3 ">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requests.length > 0 ?
                                        (
                                            requests.map(request =>
                                                <tr
                                                    key={request._id}
                                                    className="border-b border-opacity-20 hover:border-gray-300 hover:bg-gray-50 hover:bg-opacity-90 opacity-90 hover:opacity-85 font-normal hover:text-black text-xs lg:text-sm">
                                                    <td className="px-4 py-3 pr-10 lg:pr-0">
                                                        <Link to={`/volunteerNeed/${request.
                                                            volunteerId}`}>
                                                            <div className="flex items-center ">
                                                                <div className="flex items-center gap-2 lg:gap-3">
                                                                    <img className="object-cover h-8 lg:h-9 rounded-full" src={request?.volunteer?.photo} alt="User photo" referrerPolicy='no-referrer' />

                                                                    <div className="flex flex-col ">
                                                                        <p className=" font-semibold opacity-95 text-sm lg:text-base hover:link hover:font-semibold" tabIndex={0} role="link">{request?.volunteer?.name}</p>
                                                                        <span className=" text-xs lg:text-sm opacity-80 font-lato">{request?.volunteer?.email}</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <Link to={`/volunteerNeed/${request.
                                                            volunteerId}`}
                                                            className="hover:link hover:font-semibold"
                                                        >
                                                            <p>{request.postTitle}</p>
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <p>{new Date(request.deadline).toLocaleDateString()}</p>

                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap ">
                                                        <p className="text-[#797DFC] uppercase">{request.category}</p>

                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <div
                                                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 text-red-500 `}>
                                                            <span
                                                                className={`h-1 lg:h-1.5 w-1 lg:w-1.5 rounded-full bg-red-500 `}
                                                            ></span>
                                                            <h2 className='text-xs lg:text-sm font-normal '>{request.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                className=" btn btn-sm btn-circle  text-red-600">
                                                                <MdCancel  className="text-xl lg:text-2xl"/>
                                                            </button>
                                                            <button
                                                                className=" btn btn-sm btn-circle  text-green-600"
                                                            >
                                                                <IoIosCheckmarkCircle className="text-xl lg:text-2xl" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                        :
                                        (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-gray-500">No Data Found</td>
                                            </tr>
                                        )
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VolunteerRequests;