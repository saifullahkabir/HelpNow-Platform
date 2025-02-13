import { Link, useNavigate } from 'react-router-dom';
import error from '../assets/error.jpg'
import { Helmet } from 'react-helmet-async';
const ErrorPage = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <div className=' py-16 md:py-20 xl:py-28 font-inter'>
            <Helmet>
                <title>404 Error - HelpNow</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <img className='w-[350px] md:w-[450px] lg:w-[500px]' src={error} alt="" /></div>
            <div className='flex justify-center mt-6 md:mt-8 xl:mt-12 gap-6 md:gap-6 xl:gap-10'>
                <div onClick={handleGoBack}>
                    <h2 className='btn btn-sm shadow-xl border-none px-6 lg:px-8 font-bold text-sm xl:text-base bg-yellow-400 text-black hover:bg-yellow-200'>Go Back</h2>
                </div>
                <div>
                    <Link className='btn btn-sm shadow-xl border-none  px-6 lg:px-8 font-bold text-sm xl:text-base bg-gray-800 hover:bg-gray-600 text-white' to='/'>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;