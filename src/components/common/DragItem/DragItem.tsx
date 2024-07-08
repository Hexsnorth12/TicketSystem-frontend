import React from 'react'
import Image from 'next/image'
import deleteIcon from '@icon/delete_primary.svg'
import dotsIcon from '@icon/dots_gray.svg'

interface DragItemProps {
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDelete?: () => void
}

const DragItem: React.FC<DragItemProps> = ({ value, onChange, onDelete }) => {
    return (
        <div className="flex w-full items-center space-x-3">
            <div className="flex grow items-center space-x-3 rounded-lg border border-gray-3 px-3 py-2 md:px-4 md:py-3">
                <Image src={dotsIcon} alt="dots" width={24} height={24} />
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    className="w-full bg-transparent text-small2 text-white md:text-small1"
                />
            </div>
            <div
                className="flex cursor-pointer items-center"
                onClick={onDelete}>
                <Image src={deleteIcon} alt="delete" width={20} height={20} />
                <span className="text-small2 text-white">移除</span>
            </div>
        </div>
    )
}

export default DragItem
