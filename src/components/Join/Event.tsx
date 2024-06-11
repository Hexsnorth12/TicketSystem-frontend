'use client'
import React from 'react'
import Image from 'next/image'

import { formatJoinEventDate, truncateJoinEvent } from '@/utils'

import type { Event as Props } from '@/types'

const Event: React.FC<Props> = ({
    title,
    attendance,
    cinema,
    time,
    movie,
    img,
}) => {
    const formatedTime = formatJoinEventDate(time);
    console.log('formatedTime: ', formatedTime)
    return (
        <div className="flex gap-4">
            <div className="h-[120px] w-[120px] overflow-hidden rounded-lg bg-gray-3">
                <Image
                    src={img}
                    alt="event image"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="flex w-[180px] flex-col justify-between overflow-hidden whitespace-nowrap">
                <div className="text-white ">{truncateJoinEvent(title)}</div>
                <div className="text-sm text-gray-5">{movie}</div>

                {/* 分隔線 */}
                <div className="border-t border-t-gray-3" />

                <div className="flex items-center gap-1">
                    <Image
                        src="/icons/join/icon_cinema.png"
                        alt="attendance icon"
                        width={16}
                        height={16}
                    />
                    <div className="text-sm text-white">{cinema}</div>
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
                        <div className="text-white">{attendance}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event
