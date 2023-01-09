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
        spaceBetween={20}
        slidesPerView={1}
        virtual
      >
        {data.resources.map((resource, index) => (
          <SwiperSlide className='self-center' key={resource} virtualIndex={index}>
              <div className='bg-zinc-200 font-serif text-xl mx-12 my-8 md:mx-12 border p-4 border-solid rounded-md h-96'>
                <span className='text-2xl font-semibold'>"</span>{resource.review}<span className='text-2xl font-semibold'>"</span>
                <div className='my-4'>{resource.author} - {resource.date}</div>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>

  );
};

