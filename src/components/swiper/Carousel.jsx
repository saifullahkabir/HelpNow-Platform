

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './swiper.css';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Slide from './Slide';

import bgImage1 from '../../assets/cleaner1.jpg'
import bgImage2 from '../../assets/health.jpg'
import bgImage3 from '../../assets/tree1.jpg'
import bgImage4 from '../../assets/educational.jpg'
import bgImage5 from '../../assets/poor.jpg'
import bgImage6 from '../../assets/animal.jpg'
import bgImage7 from '../../assets/donation.jpg'

const Carousel = () => {
    return (
        <div className='relative  pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-10 md:pb-14 xl:pb-24'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <Slide
                        image={bgImage1}
                        title='Keep Our Community Clean'
                        text='Post opportunities to maintain a clean and healthy environment.'
                        buttonText="Create a Cleaning Post"
                    ></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImage2}
                        title='Support Health Camps'
                        text='Invite volunteers to provide healthcare services for communities in need.'
                        buttonText="Create a Cleaning Post"></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImage3}
                        title='Plant Trees, Save Earth'
                        text='Be a part of the green revolution by planting trees and protecting nature.'
                        buttonText="Plant a Tree"></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImage4}
                        title='Empower Through Education'
                        text='Create posts to gather volunteers for educational programs.'
                        buttonText="Post an Educational Event"></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={bgImage5}
                        title='Help the Underprivileged'
                        text='Share opportunities to assist those in need through your posts.'
                        buttonText="Post a Help Request"></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={bgImage6}
                        title='Care for Animals'
                        text='Invite volunteers to provide support for animal shelters.'
                        buttonText="Post for Animal Care"></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={bgImage7}
                        title='Donate to Make a Change'
                        text='Your contribution can help transform lives and communities.'
                        buttonText="Donate Today"></Slide>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Carousel;