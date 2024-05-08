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
                <div key={index} className="m-4 rounded-lg shadow-md">
                    <Link href="">
                        <Image
                            src={movie.image}
                            alt={movie.name}
                            width={imageSizeMap[movie.image]?.width}
                            height={imageSizeMap[movie.image]?.height}
                            className="rounded-lg object-cover"
                        />
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
                            <div className="text-number1 font-bold text-primary">
                                {movie.rank}
                            </div>
                        </div>
                        <button className="rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                            立即購票
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card
