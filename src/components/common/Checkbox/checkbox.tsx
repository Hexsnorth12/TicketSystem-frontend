import React from 'react'
interface InputProps {
    label: string
    value: string
    onChange: (value: string) => void
}

const InputComponent: React.FC<InputProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex">
            <div>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
            </div>
            <label
                htmlFor="first-name"
                className="md:small1 ms-2 text-small2 font-medium text-white">
                {label}
            </label>
        </div>
    )
}

export default InputComponent
