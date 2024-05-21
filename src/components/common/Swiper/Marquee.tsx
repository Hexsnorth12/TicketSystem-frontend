'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper/modules'
import { Popcards } from '../../../definitions/marqueeData'
import Image from 'next/image'
import '../Swiper/swiper-custom.css'
import { Input } from '@components/common'
import { SearchBtn } from '@/components/Buttons'
const Marquee: React.FC = () => {
    const [search, setSearch] = useState('')
    const handleSearchChange = (value: string) => {
        setSearch(value)
    }
    return (
        <div className="relative h-screen w-screen">
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
                className="h-full w-full">
                {Popcards.map((popcard, index) => (
                    <>
                        <SwiperSlide key={index}>
                            <div className="relative h-screen w-screen">
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    src={popcard.image}
                                    alt={popcard.name}
                                />
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center  bg-gradient-to-b from-black/60  via-black/0 to-black/60 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="text-header4 text-primary">
                        看電影不孤單
                    </div>
                    <div className="flex flex-row  items-end gap-x-4 font-sans text-header1 font-bold tracking-wide tracking-wide text-white">
                        電影揪團
                        <div className="relative h-16 w-16">
                            <Image
                                layout="fill" // required
                                objectFit="cover" // change to suit your needs
                                src="/assets/go.png"
                                alt="go"
                            />
                        </div>
                    </div>
                    <div className="pointer-events-auto relative mt-6 ">
                        <div>
                            <div className="relative w-auto shadow-sm md:w-[526px]">
                                <Input
                                    type="text"
                                    rounded="full"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="輸入關鍵字"
                                    className="h-auto w-full py-4 md:h-16"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                    <SearchBtn type="filter" />
                                    <SearchBtn type="recommend" />
                                    <SearchBtn type="search" active={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Marquee
