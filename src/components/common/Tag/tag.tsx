'use client'

import React from 'react'
import { IconType } from 'react-icons'
interface TagProps {
    icon: IconType | string
    tagValue: string
    iconColor: string
    position?: 'left' | 'right' | 'center'
}

const tagPosition = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
}

const Tag: React.FC<TagProps> = ({
    icon: Icon,
    tagValue,
    iconColor,
    position = 'center',
}) => {
    return (
        <div>
            <li
                key={tagValue}
                className={`flex items-center gap-x-2 text-center ${tagPosition[position]}`}>
                <Icon
                    className={`h-5 w-5 flex-none text-${iconColor}`}
                    aria-hidden="true"
                />
                {tagValue}
            </li>
        </div>
    )
}

export default Tag
