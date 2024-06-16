'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import avatar from '@images/avatar.jpg'

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

    const onToggleMenu = () => {
        setIsExpand((prev) => !prev)
    }
    const onLogout = async () => {
        // await logout({})
        // await dispatch(userActions.login({ account: '', email: '', token: '' }))
        // refreshAuth()
        signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
        })
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
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link href="/user/info" scroll={false}>
                            會員資料
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link
                            href="/user/tickets?status=unverified"
                            scroll={false}>
                            我的電影票
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link href="/user/favorites" scroll={false}>
                            我的收藏
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link href="/user/comments" scroll={false}>
                            我的評論
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link href="/user/sharedTicket" scroll={false}>
                            線上分票
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                        <Link href="/user/mygroups" scroll={false}>
                            我的揪團
                        </Link>
                    </li>
                    <li
                        className="cursor-pointer border-b-2 border-gray-4 py-3 text-white"
                        onClick={onLogout}>
                        <p>登出</p>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}

export default MemberMenu
