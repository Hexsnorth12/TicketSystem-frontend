'use client'
import React from 'react'
import Image from 'next/image'

import { Navigate } from '@/components/Buttons'
import { TITLE, CONTENT, HREF, BUTTON } from './constants'

import { cn } from '@/utils'

type Props = {
    type: 'join' | 'ticket'
}

const NavBanner: React.FC<Props> = ({ type }) => {
    function setBackgroundColor() {
        return type === 'join' ? 'bg-gray-1' : 'bg-gray-2'
    }

    const bgColor = setBackgroundColor()

    return (
        <div className={cn('mt-10', bgColor)}>
            <div className="navBanner-container container flex flex-col border-t border-t-gray-3 py-[60px]">
                <div className="title-container flex items-center justify-center gap-2">
                    <span className="text-header2 font-bold tracking-widest text-white">
                        {TITLE[type]}
                    </span>
                    <Image
                        src="/assets/movie-go-logo.png"
                        alt="Movie go logo"
                        width={176}
                        height={59}
                        style={{ position: 'relative', top: '12px' }}
                    />
                </div>
                <div className="content-container mt-4 text-center text-btn1 text-[#858585]">
                    {CONTENT[type]}
                </div>
                <div className="navigation-container mt-6 text-center">
                    <Navigate href={HREF[type]} icon className="bg-transparent">
                        {BUTTON[type]}
                    </Navigate>
                </div>
            </div>
        </div>
    )
}

export default NavBanner
