'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { signOut } from 'next-auth/react'

const MemberMenu = () => {
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
                className={clsx(
                    'inline-block rounded-full border border-primary px-4 py-2',
                    {
                        'bg-primary': isExpand,
                    },
                )}
                onClick={onToggleMenu}>
                <p
                    className={clsx('text-white', {
                        'text-gray-1': isExpand,
                    })}>
                    會員中心
                </p>
            </div>
            {isExpand ? (
                <ul className="absolute right-0 top-[88px] w-full rounded-lg bg-gray-1 px-4  ">
                    <li className="border-b-2 border-gray-4 py-3 text-white">
                        <Link href="/user/info" scroll={false}>
                            會員資料
                        </Link>
                    </li>
                    <li className="border-b-2 border-gray-4 py-3 text-white">
                        <Link href="/search" scroll={false}>
                            搜尋頁
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
