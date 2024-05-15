import React from 'react'
import { IconType } from 'react-icons'
interface TagProps {
    icon: IconType
    tagValue: string
    iconColor: string
}

const TagProps: React.FC<TagProps> = ({ icon: Icon, tagValue, iconColor }) => {
    return (
        <div>
            <li key={tagValue} className="flex gap-x-2">
                <Icon
                    className={`h-5 w-5 flex-none text-${iconColor}`}
                    aria-hidden="true"
                />
                {tagValue}
            </li>
        </div>
    )
}

export default TagProps
