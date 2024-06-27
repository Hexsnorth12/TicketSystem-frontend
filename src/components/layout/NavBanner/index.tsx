'use client'
import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Navigate } from '@/components/Buttons'
import { TITLE, CONTENT, HREF, BUTTON } from './constants'

import { cn } from '@/utils'

type Props = {
    type: 'join' | 'ticket'
}

const NavBanner: React.FC<Props> = ({ type }) => {
    return (
        <div className="navBanner-container flex flex-col border-t border-t-gray-3 py-[60px]">
            <div className="title-container align-center flex justify-center gap-2">
                <span className="text-header5 font-bold tracking-widest text-white md:text-header2">
                    {TITLE[type]}
                </span>
                <Image
                    src="/assets/movie-go-logo.png"
                    alt="Movie go logo"
                    width={75}
                    height={30}
                    className="md:mt-4 md:h-[59px] md:w-[176px]"
                />
            </div>
            <div className="content-container mt-4 text-center text-small2 text-[#858585] md:text-btn1">
                {CONTENT[type]}
            </div>
            <div className="navigation-container mt-6 flex justify-center text-center">
                <Navigate href={HREF[type]} icon buttonStyle="bg-transparent">
                    {BUTTON[type]}
                </Navigate>
            </div>
        </div>
    )
}

export default NavBanner
