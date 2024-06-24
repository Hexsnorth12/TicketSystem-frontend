'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import arrow from '@icon/arrow_right_primary.svg'

interface TabItemProps {
    pageTitle: string
    path: string
    hasBorder?: boolean
}

const TabItem: React.FC<TabItemProps> = ({ pageTitle, path, hasBorder }) => {
    const router = useRouter()

    return (
        <li
            className={clsx(
                'inline-block cursor-pointer  text-white hover:text-primary md:flex md:justify-between md:py-4',
                {
                    'md:border-b md:border-gray-3': hasBorder,
                },
            )}
            onClick={() => {
                router.push(path)
            }}>
            <p className="text-nowrap text-small2 md:text-btn2">{pageTitle}</p>
            <Image
                src={arrow}
                width={24}
                height={24}
                className="hidden md:block"
                alt="navigation to user info"
            />
        </li>
    )
}

export default TabItem
