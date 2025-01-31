import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Fade } from 'react-awesome-reveal';

const Faq = () => {
    return (
        <div className=" pb-10 md:pb-14 xl:pb-24 ">
            <div>
                <h2 className='text-center text-xl md:text-2xl lg:text-3xl mb-3 md:mb-5 lg:mb-8 font-semibold'>Frequently Asked Questions</h2>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 xl:p-10 rounded-2xl shadow-md">
                <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-8 lg:gap-0">

                    <div className='lg:w-2/3'>
                       <Fade direction='left'>
                       <div className="space-y-2 lg:space-y-4">
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" defaultChecked />
                                <div className="collapse-title text-base lg:text-lg xl:text-xl font-medium">How do I sign up?</div>
                                <div className="collapse-content">
                                    <p className='text-sm lg:text-base text-gray-600 opacity-90'>Register on our website and choose a volunteer activity.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-base lg:text-lg xl:text-xl font-medium">Do I need experience?</div>
                                <div className="collapse-content">
                                    <p className='text-sm lg:text-base text-gray-600 opacity-90'>No, anyone can volunteer! We provide guidance.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-base lg:text-lg xl:text-xl font-medium">Can I pick my task?</div>
                                <div className="collapse-content">
                                    <p className='text-sm lg:text-base text-gray-600 opacity-90'>Yes! Choose from various activities that match your interest.</p>
                                </div>
                            </div>
                        </div>
                       </Fade>
                    </div>
                    {/* Faq Image */}
                    <div className='sm:w-[400px] lg:w-[500px]  2xl:w-1/3  '>
                        <Fade direction='right'>
                            <DotLottieReact
                                src="https://lottie.host/73685fe1-921a-4302-9fd0-cbd414e449da/zjpYaL8imB.lottie"
                                loop
                                autoplay
                            />
                        </Fade>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Faq;