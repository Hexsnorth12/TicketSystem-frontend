import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName, truncateContent } from '../../../utils/numberUtils'

interface Movie {
    name: string
    image: string
    content: string
    type: string
    city: string
    date: string
    people: string
}

interface CardProps {
    movies: Movie[]
    imageSizeMap: { [key: string]: { width: number; height: number } }
}

const GroupCard: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
    return (
        <div className="flex flex-row items-center justify-center px-32">
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
                    <div className="text-start">
                        <div className="mt-2 text-btn1 font-medium text-white">
                            {truncateName(movie.name)}
                        </div>
                        <div className="text-small2 font-regular">
                            <div className="text-gray-5">
                                {truncateContent(movie.content)}
                            </div>
                            <div className="flex justify-between text-primary">
                                <div>{movie.date}</div>
                                <p className="px-2">{movie.people}</p>
                            </div>

                            <div className="flex text-white">
                                <div>{movie.type}</div>
                                <div className=" px-2">{movie.city}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GroupCard
