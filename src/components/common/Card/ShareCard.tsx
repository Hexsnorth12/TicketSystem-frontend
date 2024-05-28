'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'
import Chatbtn from '../../Buttons/ChatBtn'

interface Movie {
    name: string
    number: string
    price: number
    image: string
    date: string
}

interface CardProps {
    movies: Movie[]
    imageSizeMap: { [key: string]: { width: number; height: number } }
}

const ShareCard: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:px-32">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="m-4 flex flex-col items-center rounded-lg shadow-md">
                        <Link href="">
                            <div className="relative">
                                <Image
                                    src={movie.image}
                                    alt={movie.name}
                                    width={imageSizeMap[movie.image]?.width}
                                    height={imageSizeMap[movie.image]?.height}
                                    className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                />
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="mt-2 text-center">
                            <div className="text-headline5 font-medium text-white">
                                {truncateName(movie.name)}
                            </div>
                            <div className="text-small2">
                                <div className="flex items-center justify-center text-gray-5">
                                    剩餘
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        1{' '}
                                    </nav>
                                    張
                                </div>
                                <div className="flex items-center justify-center text-gray-5">
                                    NT$
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        {movie.price}{' '}
                                    </nav>
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-gray-5">
                                時效性
                                <nav className="px-2 text-number5 text-white">
                                    {' '}
                                    {movie.date}{' '}
                                </nav>
                            </div>
                        </div>

                        <Chatbtn />
                    </div>
                ))}
            </div>
            {/* Mobile-Navbar */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className="m-4 flex flex-col items-center rounded-lg shadow-md">
                        <Link href="">
                            <div className="relative">
                                <Image
                                    src={movie.image}
                                    alt={movie.name}
                                    width={imageSizeMap[movie.image]?.width}
                                    height={imageSizeMap[movie.image]?.height}
                                    className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                />
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="mt-2 text-center">
                            <div className="text-headline5 font-medium text-white">
                                {truncateName(movie.name)}
                            </div>
                            <div className="text-small2">
                                <div className="flex items-center justify-center text-gray-5">
                                    剩餘
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        1{' '}
                                    </nav>
                                    張
                                </div>
                                <div className="flex items-center justify-center text-gray-5">
                                    NT$
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        {movie.price}{' '}
                                    </nav>
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-gray-5">
                                時效性
                                <nav className="px-2 text-number5 text-white">
                                    {' '}
                                    {movie.date}{' '}
                                </nav>
                            </div>
                        </div>

                        <Chatbtn />
                    </div>
                ))}
            </div>
        </>
    )
}
export default ShareCard
