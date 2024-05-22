'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MemberMenu } from '@/components/common'
import Cartbtn from '../../Buttons/CartBtn'

interface HeaderProps {
    logoSrc: string
    isAuth: boolean
}

const Header: React.FC<HeaderProps> = ({ logoSrc, isAuth }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="fixed z-[99] w-full bg-gray-3 py-4">
            <div className="container relative flex items-center justify-between px-4">
                {/* Mobile-Navbar */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16m-7 6h7'
                                }></path>
                        </svg>
                    </button>
                </div>
                <Link href="/">
                    <Image
                        className="align-baseline"
                        src={logoSrc}
                        alt="My App Logo"
                        width={176}
                        height={72}
                    />
                </Link>
                <Link href="/cart" className="flex md:hidden">
                    <Cartbtn amount={0} />
                </Link>
                {/* Desktop-Navbar */}
                <nav className="hidden items-center space-x-4 md:flex">
                    <Link href="/movies">
                        <p className="text-white">電影總表</p>
                    </Link>
                    <Link href="/gatherings">
                        <p className="text-white">一起揪團</p>
                    </Link>
                    <Link href="/cart">
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

            {/* Mobile-Sidebar */}
            <div
                className={`fixed mt-3 h-full w-[75%] transform bg-gray-2 transition-transform duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <nav className="flex flex-col space-y-4 p-4">
                    <Link href="/movies" className="block px-4 py-2 text-white">
                        電影總表
                    </Link>
                    <Link
                        href="/gatherings"
                        className="block px-4 py-2 text-white">
                        一起揪團
                    </Link>
                    {!isAuth ? (
                        <Link
                            href="/login"
                            className="block px-4 py-2 text-white"
                            scroll={false}>
                            會員登入
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
