'use client'

import React from 'react'
import Image from 'next/image'
import star from '@icon/star_gray.svg'
import clsx from 'clsx'

interface CommentCardProps {
    avatar: string
    userName: string
    comment: string
    stars?: number
}

const CommentCard: React.FC<CommentCardProps> = ({
    avatar,
    userName,
    comment,
    stars = 1,
}) => {
    const renderStars = () => {
        const starts = Array.from({ length: 5 }, (_, index) => (
            <Image
                key={index}
                src={star}
                alt={'star'}
                width={16}
                height={16}
                className={clsx('', {
                    grayscale: index > stars - 1,
                })}
            />
        ))

        return starts
    }
    return (
        <div className="flex flex-1 flex-col gap-4 rounded-lg bg-gray-1 p-6 md:gap-6 md:px-9 md:py-8">
            <div className="flex items-center justify-between">
                <Image
                    src={avatar}
                    alt={'avatar'}
                    width={48}
                    height={48}
                    className="h-10 w-10 rounded-full md:h-[60px] md:w-[60px]"
                />
                <p className="text-small2 tracking-wide text-white md:text-small1">
                    {userName}
                </p>
            </div>
            <p className="grow text-small2 tracking-wide text-gray-5 md:text-small1">
                {comment}
            </p>
            <div className="flex">{renderStars()}</div>
        </div>
    )
}

export default CommentCard
