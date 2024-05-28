import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import arrow from '@icon/arrow_right_primary.svg'

interface TabItemProps {
    pageTitle: string
    path: string
    hasBorder?: boolean
}

const TabItem: React.FC<TabItemProps> = ({ pageTitle, path, hasBorder }) => {
    return (
        <li
            className={clsx(
                'inline-block text-white  hover:text-primary md:flex md:justify-between md:py-4',
                {
                    'md:border-b md:border-gray-3': hasBorder,
                },
            )}>
            <Link href={path} className="text-nowrap text-small2 md:text-btn2">
                {pageTitle}
            </Link>
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
