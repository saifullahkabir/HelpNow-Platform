import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdCancel } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";


const MyVolunteerRequests = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const location = useLocation();

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

    // for scrollIntoView
    useEffect(() => {
        if (location.hash === "#volunteer-requests") {
            const element = document.getElementById("volunteer-requests");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

   
    const handleRequestDelete = async id => {
     
        // Confirmation Popup
        const result =await Swal.fire({
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
                        title: "Deleted!",
                        text: "Your volunteer request has been deleted.",
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
        <div id="volunteer-requests" className=" pb-16 md:pb-20 xl:pb-24 2xl:pb-28 xl:px-20 2xl:px-24">
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
                                                className="border-b border-opacity-20 hover:border-gray-300 hover:bg-gray-50 hover:bg-opacity-90 opacity-90 hover:opacity-85 font-normal hover:text-black text-xs lg:text-sm">
                                                <td className="px-4 py-3 pr-10 lg:pr-0">
                                                    <Link to={`/volunteerNeed/${myRequest.
                                                        volunteerId}`}>
                                                        <div className="flex items-center ">
                                                            <div className="flex items-center gap-2 lg:gap-3">
                                                                <img className="object-cover h-8 lg:h-9 rounded-full" src={myRequest?.organizer?.photo} alt="User photo" referrerPolicy='no-referrer'/>

                                                                <div className="flex flex-col ">
                                                                    <p className=" font-semibold opacity-95 text-sm lg:text-base hover:link hover:font-semibold" tabIndex={0} role="link">{myRequest?.organizer?.name}</p>
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
                                                    <p className="text-[#797DFC] uppercase">{myRequest.category}</p>

                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div
                                                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 text-red-500 `}>
                                                        <span
                                                            className={`h-1 lg:h-1.5 w-1 lg:w-1.5 rounded-full bg-red-500 `}
                                                        ></span>
                                                        <h2 className='text-xs lg:text-sm font-normal '>{myRequest.status}</h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleRequestDelete(myRequest._id)}
                                                        className=" btn btn-sm btn-circle text-xl lg:text-2xl text-red-600">
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