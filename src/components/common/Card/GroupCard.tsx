import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

const truncateName = (name: string): string => {
    if (name && name.length > 5) {
        return name.slice(0, 5) + '...'
    }
    return name
}

const truncateContent = (content: string): string => {
    if (content && content.length > 12) {
        return content.slice(0, 12) + '...'
    }
    return content
}

const GroupCard: React.FC<CardProps> = ({ movies, imageSizeMap }) => {
    return (
        <div className="px-32 flex flex-row items-center justify-center">
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
                    <div className="mt-2 text-start text-white">
                        <h2 className="text-l font-semibold">
                            {truncateName(movie.name)}
                        </h2>
                        <div style={{ fontSize: '14px' }}>
                            <p style={{ color: '#888888' }}>
                                {truncateContent(movie.content)}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    color: '#00FFFF',
                                }}>
                                <p>{movie.date}</p>
                                <p className="px-2">{movie.people}</p>
                            </div>

                            <div className="flex text-white">
                                <p>{movie.type}</p>
                                <p>{movie.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GroupCard
