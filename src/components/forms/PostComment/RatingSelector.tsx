import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import star from '@icon/star_gray.svg'

interface RatingSelectorProps {
    onClick: (index: number) => void
}

export interface RatingSelectorRef {
    resetSelectedIndex: () => void
}

const RatingSelector: React.ForwardRefRenderFunction<
    RatingSelectorRef,
    RatingSelectorProps
> = ({ onClick }, ref) => {
    const [hoverIndex, setHoverIndex] = useState(-1)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useImperativeHandle(ref, () => ({
        resetSelectedIndex: () => {
            setSelectedIndex(-1)
        },
    }))

    const renderStars = () => {
        const starts = Array.from({ length: 5 }, (_, index) => (
            <Image
                key={index}
                src={star}
                alt={'star'}
                width={24}
                height={24}
                className={clsx('', {
                    grayscale:
                        index >
                        (hoverIndex !== -1 ? hoverIndex : selectedIndex),
                })}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => onCheckRating(index)}
            />
        ))

        return starts
    }

    const onCheckRating = (index: number) => {
        setSelectedIndex(index)
        onClick(index)
    }

    return <div className="flex">{renderStars()}</div>
}

export default forwardRef(RatingSelector)
