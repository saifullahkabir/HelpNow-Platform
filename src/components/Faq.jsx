import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Faq = () => {
    return (
        <div className="py-12 ">
            <div>
                <h2 className='text-center text-xl md:text-2xl lg:text-3xl mb-3 md:mb-5 lg:mb-8 font-semibold'>Frequently Asked Questions</h2>
            </div>
            <div className=" p-10 rounded-2xl shadow-md">
                <div className="flex flex-col-reverse md:flex-row ">

                    <div className='w-2/3'>
                        <div className="space-y-4">
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" defaultChecked />
                                <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                                <div className="collapse-content">
                                    <p>hello, welcome the helpnow</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                                <div className="collapse-content">
                                    <p>My name is rana , ok</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border-[#797DFC] border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                                <div className="collapse-content">
                                    <p>My age is 20, and i am single</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Faq Image */}
                    <div className='w-1/3'>
                        <DotLottieReact
                           src="https://lottie.host/73685fe1-921a-4302-9fd0-cbd414e449da/zjpYaL8imB.lottie"
                            loop
                            autoplay
                        />

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Faq;