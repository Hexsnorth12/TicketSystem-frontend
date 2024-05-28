'use client'

import React from 'react'
import { IconType } from 'react-icons'
interface TagProps {
    icon: IconType | string
    tagValue: string
    iconColor: string
}

const Tag: React.FC<TagProps> = ({ icon: Icon, tagValue, iconColor }) => {
    return (
        <div>
            <li
                key={tagValue}
                className="flex flex  items-center justify-center gap-x-2 text-center">
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
