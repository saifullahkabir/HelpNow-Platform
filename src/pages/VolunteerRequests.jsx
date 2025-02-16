import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { BsCheckAll } from "react-icons/bs";
import { PiUserCheckBold, PiUserCheckFill, PiUserCircleCheckFill } from "react-icons/pi";

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
        refetch
    } = useQuery({
        queryFn: getData,
        queryKey: ['requests', user?.email]
    })
    console.log(requests, 'data');

    // cancel volunteer request
    const handleRequestDelete = async id => {

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
                const response = await axiosCommon.delete(`/volunteerRequest/${id}`);
                console.log(response, 'response');
                if (response.data.deletedCount > 0) {
                    // ui update
                    refetch();
                    // Success Message
                    await Swal.fire({
                        title: "Cancelled!",
                        text: "Volunteer request has been Cancelled.",
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

    // handle Accepted 
    const handleAccept = async (id) => {
        try {
            await axiosCommon.patch(`/volunteer-requests/${id}`, { status: 'Accepted' });
            toast.success('Request Accepted!');
            refetch();
        }
        catch (err) {
            toast.error(err.code);
        }
    }


    if (isLoading) {
        return <div className="flex justify-center mt-48 md:mt-60 xl:mt-72">
            <span className="loader2"></span>
        </div>
    }


    return (
        <div>
            <Helmet>
                <title>Volunteer Requests - HelpNow</title>
            </Helmet>
            <div className=" pt-24 lg:pt-24 xl:pt-28 pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24 ">
                <div className="-mx-2 md:-mx-0 opacity-95">
                    <div className="flex items-center gap-x-3 mb-4">
                        <h2 className=" text-lg md:text-xl  font-semibold leading-tight">Volunteer Requests</h2>
                        <span className='px-3 py-1 text-xs md:text-sm bg-[#a8abff4b]  text-[#797DFC] rounded-full '>
                            {requests?.length} Request
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
                                                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2  ${request.status === 'Requested' && 'bg-red-100/60 text-red-500'}
                                                            ${request.status === 'Accepted' && 'bg-green-100/60 text-green-500'}
                                                           
                                                            `}>
                                                            <span
                                                                className={`h-1 lg:h-1.5 w-1 lg:w-1.5 rounded-full ${request.status === 'Requested' && 'bg-red-500'} 
                                                                ${request.status === 'Accepted' && 'bg-green-500'}
                                                                `}
                                                            ></span>
                                                            <h2 className='text-xs lg:text-sm font-normal '>{request.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap">
                                                        <div className="flex justify-center items-center gap-4">
                                                            <button
                                                                title="cancel!"
                                                                onClick={() => handleRequestDelete(request._id)}
                                                                disabled={request.status === 'Accepted'}
                                                                className="disabled:hidden btn btn-sm btn-circle  text-red-600">
                                                                <MdCancel className="text-xl lg:text-2xl" />
                                                            </button>
                                                            {/* Accept Button */}
                                                            {
                                                                request.status === 'Accepted' ?
                                                                    (
                                                                        <button
                                                                            title="Accepted!"
                                                                            className="btn btn-sm btn-circle  text-green-600 " >
                                                                            <PiUserCircleCheckFill className="text-xl lg:text-2xl" />
                                                                        </button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button
                                                                            title="Accept!"
                                                                            onClick={() => handleAccept(request._id)}
                                                                            className=" btn btn-sm btn-circle  text-green-600 "
                                                                        >
                                                                            <IoIosCheckmarkCircle className="text-xl lg:text-2xl" />
                                                                        </button>
                                                                    )
                                                            }
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
        </div >
    );
};

export default VolunteerRequests;