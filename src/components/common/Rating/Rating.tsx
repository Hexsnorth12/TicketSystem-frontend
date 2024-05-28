'use client'

import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import star from '@icon/star_gray.svg'

interface RatingProps {
    stars?: number
}

const Rating: React.FC<RatingProps> = ({ stars = 1 }) => {
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
    return <div className="flex">{renderStars()}</div>
}

export default Rating
