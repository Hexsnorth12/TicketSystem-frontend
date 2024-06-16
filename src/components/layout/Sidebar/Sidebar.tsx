'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import clsx from 'clsx'
import avatar from '@images/avatar.jpg'
import ScrollTabs from '@/components/common/ScrollTabs/ScrollTabs'
import uploadImage from '@/lib/uploadImage'
import {
    useUpdateInfoMutation,
    useLazyGetInfoQuery,
} from '@/services/modules/user'
import add from '@icon/add_primary.svg'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [updateInfo] = useUpdateInfoMutation()
    const [getInfo, { data: userInfo }] = useLazyGetInfoQuery()
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        const getUserInfo = async () => {
            const session = await getSession()
            const token = session?.accessToken || ''
            getInfo({ token })
        }
        getUserInfo()
    }, [getInfo])

    const handleClick = () => {
        if (fileRef.current) fileRef.current.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return
        const formData = new FormData()
        formData.append('avatar', file)
        const session = await getSession()
        const token = session?.accessToken || ''
        const imageURL = await uploadImage(formData, 'user', token)
        await updateInfo({
            payload: {
                imgUrl: imageURL,
            },
            token,
        }).unwrap()
        getInfo({ token })
    }

    const onHoverAvatar = () => {
        setIsHover(true)
    }

    const onLeaveAvatar = () => {
        setIsHover(false)
    }

    return (
        <div className="w-full md:px-6 md:py-8">
            <div className="mb-4 md:mb-6">
                <div
                    className={clsx(
                        'relative mx-auto mb-4 h-[83px] w-[80px] cursor-pointer rounded-full bg-gradient-to-b from-primary to-gray-6 p-[3px] md:h-[123px] md:w-[120px]',
                        'z-10 after:absolute after:right-0 after:top-0 after:hidden after:h-full after:w-full after:rounded-full after:bg-gray-1 after:opacity-50 after:hover:block',
                    )}
                    onClick={handleClick}
                    onMouseEnter={onHoverAvatar}
                    onMouseLeave={onLeaveAvatar}>
                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Image
                        src={userInfo?.imgUrl ?? avatar}
                        alt="avatar"
                        className="h-full w-full rounded-full object-cover"
                        width={80}
                        height={80}
                    />
                    <Image
                        src={add}
                        alt="uploadImage"
                        className={clsx(
                            'absolute left-[50%] top-[50%] z-30 -translate-x-1/2 -translate-y-1/2',
                            {
                                hidden: !isHover,
                            },
                        )}
                        width={24}
                        height={24}
                    />
                </div>
                <p className="text-center text-header5 font-medium tracking-wider text-white md:text-header4 md:leading-120">
                    {userInfo?.name}
                </p>
            </div>
            <div className="-mx-3 border-b border-gray-3 py-3 md:mx-0 md:rounded-lg md:border md:px-4">
                <ScrollTabs />
            </div>
        </div>
    )
}

export default Sidebar
