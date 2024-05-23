'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MemberMenu } from '@/components/common'
import Cartbtn from '../../Buttons/CartBtn'

interface HeaderProps {
    logoSrc: string
    isAuth: boolean
}
const Header: React.FC<HeaderProps> = ({ logoSrc, isAuth }) => {
    return (
        <header className=" fixed z-[99] w-full bg-gray-800 py-4">
            <div className="container relative flex items-center justify-between">
                <Link href="">
                    <Image
                        className="align-baseline"
                        src={logoSrc}
                        alt="My App Logo"
                        width={176}
                        height={72}
                    />
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/movies">
                        <p className="text-white">電影總表</p>
                    </Link>
                    <Link href="/gatherings">
                        <p className="text-white">一起揪團</p>
                    </Link>
                    <Link href={'/cart'}>
                        {/* <Image
                            src={cartIcon}
                            width={24}
                            height={24}
                            alt="navigate to cart page"
                        /> */}
                        <Cartbtn amount={0} />
                    </Link>
                    {!isAuth ? (
                        <Link href="/login" scroll={false}>
                            <div
                                className="inline-block rounded-full border px-4 py-2"
                                style={{ borderColor: '#00FFFF' }}>
                                <p className="text-white">會員登入</p>
                            </div>
                        </Link>
                    ) : (
                        <MemberMenu />
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
