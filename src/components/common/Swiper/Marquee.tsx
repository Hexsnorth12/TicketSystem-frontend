'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper/modules'
import { Popcards } from '../../../definitions/marqueeData'
import Image from 'next/image'
import '../Swiper/swiper-custom.css'
import { ArrowBtns } from '../../Buttons/ArrowBtns'

const Marquee: React.FC = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={50}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay
                modules={[Pagination, Navigation]}
                className="">
                {Popcards.map((popcard, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={popcard.image}
                            width={1920}
                            height={1080}
                            alt={popcard.name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Marquee
