import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

const truncateName = (name: string): string => {
    if (name && name.length > 5) {
        return name.slice(0, 5)
    }
    return name
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
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <div className="mt-2 text-start text-white">
                                <h2 className="text-l font-semibold">
                                    {truncateName(movie.name)}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {movie.type}
                                </p>
                            </div>
                            <h2
                                className="font-semibold"
                                style={{ color: '#00FFFF', fontSize: '32px' }}>
                                {movie.rank}
                            </h2>
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
