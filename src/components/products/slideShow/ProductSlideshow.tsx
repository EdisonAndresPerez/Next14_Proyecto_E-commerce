'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperObject } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'
import { useState } from 'react'

interface Props {
  images: string[]
  name: string
  className?: string
}

export const ProductSlideshow = ({ images, name, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject | null>(null)

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/products/${image}`}
              alt={`${name} - imagen ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/products/${image}`}
              alt={`${name} - thumbnail ${index + 1}`}
              className='w-full h-full object-cover cursor-pointer'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
