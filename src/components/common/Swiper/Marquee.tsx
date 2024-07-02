'use client'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation } from 'swiper/modules'
import { Popcards } from '../../../definitions/marqueeData'
import Image from 'next/image'
import './swiper-custom.css'
import { Input } from '@components/common'
import { SearchBtn } from '@/components/Buttons'
import { Modal } from '@components/common'
import { SearchForm } from '@components/forms'
import Link from 'next/link'

const Marquee: React.FC = () => {
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleSearchChange = (value: string) => {
        setSearch(value)
    }
    const handleFilterClick = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    return (
        <div className="relative h-[240px] md:h-screen">
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
                    <SwiperSlide key={index}>
                        <div className="h-full w-full">
                            <Image
                                fill
                                objectFit="cover"
                                src={popcard.image}
                                alt={popcard.name}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center  bg-gradient-to-b from-black/60  via-black/0 to-black/60 text-center">
                <div className="flex flex-col items-center md:space-y-4">
                    <div className="text-btn2 text-primary md:text-header4">
                        看電影不孤單
                    </div>
                    <div className="flex flex-row  items-end  gap-x-2 font-sans text-header4 font-bold tracking-wide text-white md:gap-x-4 md:text-header1">
                        電影揪團
                        <div className="relative h-6 w-6 md:h-16 md:w-16">
                            <Image
                                fill // required
                                objectFit="cover" // change to suit your needs
                                src="/assets/go.png"
                                alt="go"
                            />
                        </div>
                    </div>
                    <div className=" pointer-events-auto absolute top-1 order-first -mt-2 md:relative md:order-last md:mt-6">
                        <div>
                            <div className="relative shadow-sm">
                                <Input
                                    type="text"
                                    rounded="none"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="輸入關鍵字"
                                    className="h-12 w-screen py-5 md:h-16 md:w-[526px] md:rounded-full"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                    <SearchBtn
                                        type="filter"
                                        onClick={handleFilterClick}
                                    />
                                    <Link href="/generalMovies">
                                        <SearchBtn type="recommend" />
                                    </Link>
                                    <Link href="/search/notfound">
                                        <SearchBtn
                                            type="search"
                                            active={true}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <Modal onClose={handleModalClose}>
                            <div className="mx-auto overflow-auto border-0 bg-gray-2 p-4">
                                <SearchForm />
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Marquee
