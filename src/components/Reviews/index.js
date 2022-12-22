import React from 'react';
import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import data from './data.json';

export default function Reviews() {
  return (
    <>
          <Swiper
        modules={[Virtual, Navigation]}
        navigation
        spaceBetween={5}
        slidesPerView={1}
        virtual
      >
        {data.resources.map((resource, index) => (
          <SwiperSlide className='self-center' key={resource} virtualIndex={index}>
              <div className='font-serif text-2xl mx-12 p-4 md:mx-64 '>
                <span className='text-2xl font-semibold'>"</span>{resource.review}<span className='text-2xl font-semibold'>"</span>
                <div className='my-4'>{resource.author} - {resource.date}</div>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>

  );
};

