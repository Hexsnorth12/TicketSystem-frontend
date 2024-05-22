'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'
import Button from '../../common/Button/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

interface Movie {
    name: string
    image: string
    type: string
    rank: number
}

interface CardProps {
    movies: Movie[]
    imageSizeMap: { [key: string]: { width: number; height: number } }
}

const Card: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:block">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Navigation]}>
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className="m-4 overflow-hidden rounded-lg p-4">
                            <Link href="">
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <Image
                                            src={movie.image}
                                            alt={movie.name}
                                            width={
                                                imageSizeMap[movie.image]?.width
                                            }
                                            height={
                                                imageSizeMap[movie.image]
                                                    ?.height
                                            }
                                            className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                        />
                                        {/* Border-primary with blur effect */}
                                        <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                                    </div>

                                    <div className="text-center">
                                        <div className="flex justify-between">
                                            <div className="mt-2 text-start text-white">
                                                <div className="text-btn1 font-medium">
                                                    {truncateName(movie.name)}
                                                </div>
                                                <div className="text-small1 font-regular text-gray-5">
                                                    {movie.type}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    index < 3
                                                        ? 'bg-gradient-to-b from-primary to-gray-6 bg-clip-text text-number1 font-bold text-transparent'
                                                        : 'text-number1 font-bold text-gray-3'
                                                }>
                                                {movie.rank}
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            title="立即購票"
                                            className="py-1">
                                            立即購票
                                        </Button>
                                    </div>
                                </SwiperSlide>
                            </Link>
                        </div>
                    ))}
                </Swiper>
            </div>
            {/* Mobile-Navbar */}
            <div className="block overflow-x-scroll whitespace-nowrap md:hidden">
                {movies.map((movie, index) => (
                    <div key={index} className="mx-1 inline-block w-32">
                        <Link href="">
                            <div className="relative">
                                <Image
                                    src={movie.image}
                                    alt={movie.name}
                                    width={imageSizeMap[movie.image]?.width}
                                    height={imageSizeMap[movie.image]?.height}
                                    className="rounded-lg"
                                />
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>

                            <div className="text-center">
                                <div className="flex">
                                    <div className="mt-2 text-start text-white">
                                        <div className="text-btn2 font-medium">
                                            {truncateName(movie.name)}
                                        </div>
                                        <div className="text-small2 font-regular text-gray-5">
                                            {movie.type}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            index < 3
                                                ? 'bg-gradient-to-b from-primary to-gray-6 bg-clip-text text-number2 font-bold text-transparent'
                                                : 'text-number2 font-bold text-gray-3'
                                        }>
                                        {movie.rank}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    title="立即購票"
                                    className="hidden py-1">
                                    立即購票
                                </Button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Card
