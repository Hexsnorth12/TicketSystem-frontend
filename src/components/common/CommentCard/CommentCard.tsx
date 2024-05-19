'use client'

import React from 'react'
import Image from 'next/image'
import avatar from '@images/avatar.jpg'
import star from '@icon/star_gray.svg'

interface CommentCardProps {
    comment: string
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
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
                    lovealgebra
                </p>
            </div>
            <p className="grow text-small2 tracking-wide text-gray-5 md:text-small1">
                {comment}
            </p>
            <div className="flex">
                <Image
                    src={star}
                    alt={'star'}
                    width={16}
                    height={16}
                    className=""
                />
                <Image
                    src={star}
                    alt={'star'}
                    width={16}
                    height={16}
                    className=""
                />
                <Image
                    src={star}
                    alt={'star'}
                    width={16}
                    height={16}
                    className=""
                />
                <Image
                    src={star}
                    alt={'star'}
                    width={16}
                    height={16}
                    className=""
                />
                <Image
                    src={star}
                    alt={'star'}
                    width={16}
                    height={16}
                    className=""
                />
            </div>
        </div>
    )
}

export default CommentCard
