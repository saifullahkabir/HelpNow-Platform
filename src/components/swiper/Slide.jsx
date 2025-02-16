import { Link } from "react-router-dom";
import 'animate.css';
const Slide = ({image, text,buttonText, title}) => {
    return (
        <div>
           <div
            className=' w-full  bg-center bg-cover h-[15rem] md:h-[25rem] lg:h-[30rem] xl:h-[35rem] 2xl:h-[42rem] '
            style={{
                backgroundImage: `url(${image})`,
                
                
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/40 '>
                <div className='text-center px-4 '>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-1 md:mb-3 lg:mb-4'>
                       {title}
                    </h1>
                    <p className="text-sm md:text-base xl:text-lg text-white opacity-85 mb-1 md:mb-3 lg:mb-4">
                        {text}
                    </p>
                    <br />
                    <Link to='/add-post' className=' btn btn-sm lg:btn-md text-xs lg:text-base  bg-[#797DFC] hover:bg-[#888cfcc0] text-white font-semibold font-inter  md:px-6  border-none'>
                        {buttonText}
                    </Link>
                </div>
            </div>  
        </div>
        </div>
    );
};

export default Slide;