'use client'
import React from 'react'
import Image from 'next/image'

import { cn, formatJoinEventDate, truncateJoinEvent } from '@/utils'

import type { Event as Props } from '@/types'

const Event: React.FC<Props> = ({
    title,
    amount,
    theater,
    time,
    movieTitle,
    placeholderImg,
    onClick,
    containerStyle,
}) => {
    const formatedTime = formatJoinEventDate(new Date(time))

    return (
        <div
            className={cn(
                'flex cursor-pointer gap-4',
                containerStyle && containerStyle,
            )}
            onClick={() => onClick()}>
            <div className="h-[120px] w-[120px] overflow-hidden rounded-lg bg-gray-3">
                <Image
                    loader={() => placeholderImg}
                    src={placeholderImg}
                    alt="event image"
                    width={120}
                    height={120}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
            <div className="flex flex-1 flex-col justify-between overflow-hidden whitespace-nowrap">
                <div className="text-white ">{truncateJoinEvent(title)}</div>
                <div className="text-sm text-gray-5">{movieTitle}</div>

                {/* 分隔線 */}
                <div className="border-t border-t-gray-3" />

                <div className="flex items-center gap-1">
                    <Image
                        src="/icons/join/icon_cinema.png"
                        alt="attendance icon"
                        width={16}
                        height={16}
                    />
                    <div className="text-sm text-white">{theater}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-primary">{formatedTime}</div>
                    <div className="flex items-center gap-1">
                        <Image
                            src="/icons/join/icon_attendance.png"
                            alt="attendance icon"
                            width={16}
                            height={16}
                        />
                        <div className="text-white">{amount}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event
