import React from 'react'
import { IoClose } from 'react-icons/io5'
interface InputProps {
    value: string
    onDelete?: (value: string) => void
}

const ChipComponent: React.FC<InputProps> = ({ value, onDelete }) => {
    return (
        <div className="flex h-8 items-center justify-center rounded-lg border-[1px] border-primary">
            <label className="flex w-full items-center justify-between gap-2 px-3 py-1 text-small2 font-regular leading-5 text-white">
                <span className="flex-grow text-center">{value}</span>
                {onDelete && (
                    <button
                        onClick={() => onDelete(value)}
                        className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-5 p-1 text-white hover:bg-gray-4">
                        <IoClose />
                    </button>
                )}
            </label>
        </div>
    )
}
export default ChipComponent
