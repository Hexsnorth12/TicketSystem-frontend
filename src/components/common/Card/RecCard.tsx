import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Tag from '@components/common/Tag/tag'
import { truncateName, truncateContent } from '../../../utils/numberUtils'
import { MapPinIcon } from '@heroicons/react/20/solid'
interface Movie {
    name: string
    image: string
    content: string
    city: string
    ticket: string
}

interface CardProps {
    movies: Movie[]
    imageSizeMap: { [key: string]: { width: number; height: number } }
}

const RecCard: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
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
                    <div className="text-start">
                        <div className="text-btn1 mt-2 font-medium text-white">
                            {truncateName(movie.name)}
                        </div>
                        <div className="text-small2 font-regular">
                            <div className="text-gray-5">
                                {truncateContent(movie.content)}
                            </div>
                            <div className="flex text-white">
                                <div>{movie.ticket}</div>
                                <div className=" px-2">
                                    <Tag
                                        icon={MapPinIcon}
                                        tagValue={movie.city}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecCard
