import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import arrow_left from '@icon/arrow_left_white.svg'

interface PrevPageProps {
    pageName: string
    pagePath: string
}

const PrevPage: React.FC<PrevPageProps> = ({ pageName, pagePath }) => {
    return (
        <Link href={pagePath} className="flex">
            <Image
                src={arrow_left}
                width={24}
                height={24}
                alt="go to previous page"
            />
            <span className="text-btn1 font-medium tracking-wider text-white">
                {pageName}
            </span>
        </Link>
    )
}

export default PrevPage
