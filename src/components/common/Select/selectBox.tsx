import React from 'react'

interface SelectBoxProps {
    title: string
    children: React.ReactNode
}

const SelectBox: React.FC<SelectBoxProps> = ({ title, children }) => {
    return (
        <div>
            <label className="mb-2 block text-small2 text-gray-5 md:text-small1">
                {title}
            </label>
            {children}
        </div>
    )
}

export default SelectBox
