'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Rating } from '@/components/common'

interface MyCommentProps {
    productName: string
    starts: number
    comment: string
    photoPath: string
}

const MyComment: React.FC<MyCommentProps> = ({
    productName,
    starts,
    comment,
    photoPath,
}) => {
    return (
        <Link
            href={'#'}
            className="flex h-full flex-col gap-3 rounded-lg bg-gray-3 p-6 md:gap-4 md:p-3">
            <div className="flex gap-4">
                <Image
                    src={photoPath}
                    width={132}
                    height={80}
                    alt={'movie picture'}
                    className="rounded-lg"
                />
                <p className="text-btn2 tracking-wider text-white">
                    {productName}
                </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
                <Rating stars={starts} />
                <div className="flex-1 rounded-md bg-gray-1 p-3">
                    <p className="text-small2 leading-150 tracking-wide text-gray-5">
                        {comment}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default MyComment
