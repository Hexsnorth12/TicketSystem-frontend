import React from 'react'
interface InputProps {
    label: string
    value: string
    onChange: (value: string) => void
}

const InputComponent: React.FC<InputProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex items-center">
            <div className="">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
            </div>
            <label
                htmlFor="first-name"
                className="ms-2 text-sm font-medium text-white dark:text-gray-300">
                {label}
            </label>
        </div>
    )
}

export default InputComponent
