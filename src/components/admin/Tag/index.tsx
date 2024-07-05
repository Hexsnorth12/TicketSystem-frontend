'use client'
import React from 'react'
import Image from 'next/image'

import close from '@icon/close_gray.svg'

interface Props {
    value: string
    onDelete: () => void
}

const Tag: React.FC<Props> = ({ value, onDelete }) => {
    return (
        <div className="flex items-center space-x-2 rounded-lg border border-primary py-1 pl-3 pr-2 select-none">
            <span className="text-small2 text-white">{value}</span>
            <Image
                src={close}
                alt="close"
                width={16}
                height={16}
                onClick={onDelete}
            />
        </div>
    )
}

export default Tag
