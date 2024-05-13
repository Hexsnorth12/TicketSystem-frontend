import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'

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
        <div className="grid grid-cols-5 gap-4 px-32">
            {movies.map((movie, index) => (
                <div key={index} className="m-4 overflow-hidden rounded-lg p-4">
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
                        <button className="rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:border-4 focus:border-primary focus:bg-primary focus:outline-none">
                            立即購票
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card
