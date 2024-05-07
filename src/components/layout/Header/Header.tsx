import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
    logoSrc: string
}
const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
    return (
        <header className="bg-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="">
                    <Image
                        src={logoSrc}
                        alt="My App Logo"
                        width={180}
                        height={60}
                    />
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link href="/movies">
                        <p className="text-white">電影總表</p>
                    </Link>
                    <Link href="/gatherings">
                        <p className="text-white">一起揪團</p>
                    </Link>
                    <Link href="/login" scroll={false}>
                        <div
                            className="inline-block rounded-full border px-4 py-2"
                            style={{ borderColor: '#00FFFF' }}>
                            <p className="text-white">會員登入</p>
                        </div>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
