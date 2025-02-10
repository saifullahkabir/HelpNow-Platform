import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useNavigate } from "react-router-dom";


const BeAVolunteer = ({ volunteerNeed, volunteersNeeded, setVolunteersNeeded }) => {
    const { user } = useAuth()
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const {
        _id,
        thumbnail,
        postTitle,
        description,
        category,
        location,
        deadline,
        organizer,
    } = volunteerNeed || {};

    const handleBeAVolunteer = async e => {
        e.preventDefault();
        if (user?.email === organizer?.email) {
            toast.error('You can not volunteer request in own post!');
            // Modal Close
            document.getElementById("my_modal_3").close();
            return;
        }
        const form = e.target;
        const volunteerId = _id;
        const email = user?.email;
        const name = user?.displayName;
        const photo = user?.photoURL;
        const suggestion = form.suggestion.value.trim() || "N/A";
        const status = 'Requested';

        const volunteerData = {
            volunteerId,
            postTitle,
            thumbnail,
            description,
            category, 
            volunteersNeeded,
            location,
            deadline,
            organizer,
            volunteer: {
                name,
                email,
                photo
            },
            suggestion,
            status
        }
        
        try{
            await axiosCommon.post(`/volunteerRequest`, volunteerData);
            setVolunteersNeeded(prev => prev - 1);
            document.getElementById("my_modal_3").close();
            toast.success("Successfully requested for volunteer!");
            // navigate('/my-post')
            

        }
        catch(err) {
            document.getElementById("my_modal_3").close();
            toast.error(err?.message);
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center  '>
                <section className='w-full md:px-4 lg:px-8 xl:px-14 py-2 md:py-4 lg:py-6 xl:py-10 '>
                    <div className="flex justify-between mt-2 md:mt-0">
                        <h2 className='text-lg font-semibold opacity-95 capitalize  font-inter'>
                            Be a Volunteer
                        </h2>

                        <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100/60 text-red-500 `}>
                            <span
                                className={`h-1.5 w-1.5 rounded-full bg-red-500 `}
                            ></span>
                            <h2 className='text-sm font-normal '>Requested</h2>
                        </div>
                    </div>

                    <form onSubmit={handleBeAVolunteer}>
                        <div className='grid grid-cols-1  gap-3 md:gap-6 mt-6 sm:grid-cols-2 text-sm lg:text-base'>
                            <div>
                                <label className='opacity-90 ' htmlFor='job_title'>
                                    Post Title
                                </label>
                                <input
                                    id='postTitle'
                                    name='postTitle'
                                    type='text'
                                    disabled
                                    defaultValue={postTitle}
                                    required
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='opacity-90 ' htmlFor='job_title'>
                                    Thumbnail
                                </label>
                                <input
                                    id='thumbnail'
                                    name='thumbnail'
                                    type='url'
                                    disabled
                                    defaultValue={thumbnail}
                                    required
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='opacity-90 ' htmlFor='job_title'>
                                    Location
                                </label>
                                <input
                                    id='location'
                                    name='location'
                                    type='text'
                                    disabled
                                    defaultValue={location}
                                    required
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div >
                                <label className='opacity-90 ' htmlFor='category'>
                                    Category
                                </label>
                                <input
                                    id='category'
                                    name='category'
                                    type='text'
                                    disabled
                                    defaultValue={category}
                                    required
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='opacity-90 ' htmlFor='min_price'>
                                    No. of volunteers needed
                                </label>
                                <input
                                    id='volunteersNeeded'
                                    name='volunteersNeeded'
                                    type='number'
                                    disabled
                                    defaultValue={volunteersNeeded}
                                    required
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label className='opacity-90'>Deadline</label>

                                <input
                                    id='name'
                                    type='text'
                                    name='name'
                                    disabled
                                    defaultValue={new Date(deadline).toLocaleDateString()}
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label className='opacity-90 ' htmlFor='emailAddress'>
                                    Organizer Name
                                </label>
                                <input
                                    id='name'
                                    type='text'
                                    name='name'
                                    disabled
                                    defaultValue={organizer?.name}
                                    title={organizer?.name}
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='opacity-90 ' htmlFor='emailAddress'>
                                    Organizer Email Address
                                </label>
                                <input
                                    id='emailAddress'
                                    type='email'
                                    name='email'
                                    disabled
                                    defaultValue={organizer?.email}
                                    title={organizer?.email}
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>
                            <div>
                                <label className='opacity-90 ' htmlFor='emailAddress'>
                                    Name
                                </label>
                                <input
                                    id='name'
                                    type='text'
                                    name='name'
                                    disabled
                                    defaultValue={user?.displayName}
                                    title={user?.displayName}
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label className='opacity-90 ' htmlFor='emailAddress'>
                                    Email Address
                                </label>
                                <input
                                    id='emailAddress'
                                    type='email'
                                    name='email'
                                    disabled
                                    defaultValue={user?.email}
                                    title={user?.email}
                                    className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                        </div>
                        <div className='flex flex-col gap-2 mt-3 md:mt-6 text-sm lg:text-base'>
                            <label className='opacity-90 ' htmlFor='description'>
                                Description
                            </label>
                            <textarea
                                className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='description'
                                id='description'
                                disabled
                                defaultValue={description}
                                required
                            ></textarea>
                        </div>
                        <div className='flex flex-col gap-2 mt-3 md:mt-6 text-sm lg:text-base'>
                            <label className='opacity-90 ' htmlFor='description'>
                                Suggestion
                            </label>
                            <textarea
                                className='block w-full px-4 py-2 mt-2 opacity-90 border border-gray-200 rounded-md  focus:border-gray-400 focus:ring-gray-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='suggestion'
                                id='suggestion'
                            ></textarea>
                        </div>
                        <div className='flex justify-end mt-4 md:mt-6'>
                            <button className='btn-sm lg:btn-md btn bg-[#797DFC] hover:bg-[#888cfcc0] text-white '>
                                Request
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default BeAVolunteer;