'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import avatar from '@icon/avatar.svg'
import { useCartStore } from '@/stores/useCartStore'
interface MemberMenuProps {
    userInfo?: {
        name?: string
        birthDate?: string
        email?: string
        gender?: string
        phone?: string
        address?: string
        imgUrl?: string
    }
}

const MemberMenu: React.FC<MemberMenuProps> = ({ userInfo }) => {
    const [isExpand, setIsExpand] = useState(false)
    // const [logout] = useLazyLogoutQuery()
    const LogOut = useCartStore((state) => state.LogOut)
    const onToggleMenu = () => {
        setIsExpand((prev) => !prev)
    }
    const onLogout = async () => {
        setIsExpand(false)
        LogOut()
        // await logout({})
        // await dispatch(userActions.login({ account: '', email: '', token: '' }))
        // refreshAuth()
        signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
        })
    }
    const handleClick = () => {
        setIsExpand(false)
    }
    return (
        <div className="relative">
            <div
                className={
                    'mx-auto mb-4 h-[48px] w-[48px] rounded-full bg-gradient-to-b from-primary to-gray-6 p-[3px]'
                }
                onClick={onToggleMenu}>
                <Image
                    src={userInfo?.imgUrl ?? avatar}
                    alt="avatar"
                    className={'h-full w-full rounded-full object-cover'}
                    width={48}
                    height={48}
                />
            </div>
            {isExpand ? (
                <ul className="absolute right-0 top-auto rounded-lg bg-gray-1 px-4 text-center md:h-auto md:w-[160px]">
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/info"
                            scroll={false}
                            className="block py-3 hover:text-primary"
                            onClick={handleClick}
                            >
                            會員資料
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/tickets?status=unverified"
                            scroll={false}
                            className="block py-3 hover:text-primary"
                            onClick={handleClick}
                            >
                            我的電影票
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/favorites"
                            scroll={false}
                            className="block py-3 hover:text-primary"
                            onClick={handleClick}
                            >
                            我的收藏
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/comments"
                            scroll={false}
                            className="block py-3 hover:text-primary"
                            onClick={handleClick}
                            >
                            我的評論
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/sharedTicket"
                            scroll={false}
                            className="block py-3 hover:text-primary"
                            onClick={handleClick}
                            >
                            線上分票
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-3 text-white hover:border-b-2 hover:border-b-primary">
                        <Link
                            href="/user/mygroups"
                            scroll={false}
                            className="block py-3 hover:text-primary">
                            我的揪團
                        </Link>
                    </li>
                    <li
                        className="cursor-pointer py-3 text-white hover:text-primary"
                        onClick={onLogout}>
                        <p>登出</p>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export default MemberMenu
