'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MemberMenu } from '@/components/common'
import cartIcon from '@icon/cart_light.svg'
import { useAppSelector } from '@/hooks'
import { User } from '@/types'

interface HeaderProps {
    logoSrc: string
}
const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
    const user = useAppSelector((state) => state.user) as User
    return (
        <header className=" fixed w-full bg-gray-800 py-4">
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
                        <Image
                            src={cartIcon}
                            width={24}
                            height={24}
                            alt="navigate to cart page"
                        />
                    </Link>
                    {user.account.length === 0 ? (
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
