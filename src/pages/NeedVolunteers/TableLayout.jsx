/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const TableLayout = ({ dataToShow }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-sm ">
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
                        <th className="px-4 py-3">Thumbnail</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">deadline</th>
                        <th className="px-4 py-3 ">category</th>
                        <th className="px-4 py-3 ">Organizer</th>
                        <th className="px-4 py-3 pl-10 xl:pl-0">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataToShow.length > 0 ? (
                            dataToShow.map(dataShow =>
                                <tr
                                    key={dataShow._id}
                                    className="border-b border-opacity-20 hover:border-gray-300 hover:bg-gray-50 hover:bg-opacity-90 opacity-90 hover:opacity-85 font-normal hover:text-black text-xs lg:text-sm">
                                    <td className="px-4 py-3 ">
                                        <Link to={`/volunteerNeed/${dataShow._id}`}>
                                            <div>
                                                <img className="w-24 md:w-28 lg:w-32 xl:w-40 h-full rounded-lg" src={dataShow.thumbnail} alt="thumbnail" />
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <Link to={`/volunteerNeed/${dataShow._id}`}>
                                            <p>{dataShow.postTitle}</p>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <p>{new Date(dataShow.deadline).toLocaleDateString()}</p>

                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <p className=" text-[#797DFC] uppercase">{dataShow.category}</p>

                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <Link to={`/volunteerNeed/${dataShow._id}`}>
                                            <div className="flex items-center ">
                                                <div className="flex items-center gap-2 lg:gap-3">
                                                    <img className="object-cover h-8 lg:h-9 rounded-full" src={dataShow?.organizer?.photo} alt="User photo" referrerPolicy='no-referrer' />

                                                    <div className="flex flex-col ">
                                                        <p className=" font-semibold opacity-95 text-sm lg:text-base hover:link hover:font-semibold" tabIndex={0} role="link">{dataShow?.organizer?.name}</p>
                                                        <span className=" text-xs lg:text-sm opacity-80 font-lato">{dataShow?.organizer?.email}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap pl-10 xl:pl-0">
                                        <Link to={`/volunteerNeed/${dataShow._id}`}>
                                            <div className="hover:text-[#797DFC] hover:underline hover:cursor-pointer   ">
                                                View details
                                            </div>
                                        </Link>
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
    );
};

export default TableLayout;



{/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataToShow.length > 0 ? (
                        dataToShow.map(volunteerNeed => (
                            <tr key={volunteerNeed._id} className="border-b">
                                <td className="px-4 py-2">{volunteerNeed.postTitle}</td>
                                <td className="px-4 py-2">{volunteerNeed.category || "N/A"}</td>
                                <td className="px-4 py-2">{volunteerNeed.location || "N/A"}</td>
                                <td className="px-4 py-2">{volunteerNeed.date || "N/A"}</td>
                                <td className="px-4 py-2">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">No Data Found</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div> */}