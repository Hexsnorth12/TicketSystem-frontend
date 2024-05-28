'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { truncateName } from '@/utils'
import { Movie } from '@/types'

interface MyFavoriteProps {
    movie: Movie
}

const MyFavorite: React.FC<MyFavoriteProps> = ({ movie }) => {
    return (
        <li
            className={clsx('relative rounded-lg bg-gray-1', {
                'before:absolute before:top-0  before:z-20 before:flex before:h-full before:w-full before:items-center before:justify-center before:text-header5 before:text-white before:content-["已失效"]':
                    !movie.isAvailable,
                'after:absolute after:top-0 after:z-10 after:h-full after:w-full after:rounded-lg after:bg-black after:opacity-60 after:content-[""]':
                    !movie.isAvailable,
            })}>
            <Link href={''} className="">
                <div className="relative rounded-t-lg">
                    <Image
                        src={movie.image}
                        alt="movie picture"
                        width={216}
                        height={129}
                        className="rounded-t-lg"
                    />
                    <p className="absolute right-1 top-1 z-30 text-small2 text-gray-4 hover:text-primary">
                        移除
                    </p>
                </div>
                <div className="border-b border-gray-3 px-3 py-3 md:py-4">
                    <p className="text-small2 text-gray-5">{movie.type}</p>
                    <p className="text-btn2 text-white">
                        {truncateName(movie.name)}
                    </p>
                </div>
                <div className="flex px-2 py-2">
                    <div className="rounded-lg border border-primary bg-gray-1 p-1">
                        <span className="text-small2 text-white">上映中</span>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default MyFavorite
