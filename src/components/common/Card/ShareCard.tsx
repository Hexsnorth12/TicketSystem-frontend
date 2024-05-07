import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Movie {
    name: string
    number: number
    price: number
    image: string
    date: string
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

const ShareCard: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
    return (
        <div className="px-32 grid grid-cols-4 gap-4">
            {movies.map((movie, index) => (
                <div
                    key={index}
                    className="m-4 rounded-lg text-center shadow-md">
                    <Link href="">
                        <Image
                            src={movie.image}
                            alt={movie.name}
                            width={imageSizeMap[movie.image]?.width}
                            height={imageSizeMap[movie.image]?.height}
                            className="rounded-lg object-cover"
                        />
                    </Link>
                    <div className="mt-2 text-center text-white">
                        <h2 className="text-l font-semibold">
                            {truncateName(movie.name)}
                        </h2>
                        <div
                            className="text-gray-500"
                            style={{ fontSize: '14px' }}>
                            <div style={{ color: '#00FFFF' }}>
                                剩餘：{movie.number} 張
                            </div>
                            <div> NT$ {movie.price} </div>
                        </div>
                        <p>{movie.date}</p>
                    </div>
                    <button className="rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                        聊聊
                    </button>
                </div>
            ))}
        </div>
    )
}
export default ShareCard
