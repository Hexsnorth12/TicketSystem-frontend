import React from 'react'
interface CheckboxProps {
    label: string
    checked: boolean
    onChange: () => void
    defaultChecked?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    defaultChecked = false,
}) => {
    return (
        <div className="flex items-center">
            <div className="relative flex cursor-pointer items-center rounded-full p-2">
                <input
                    type="checkbox"
                    className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-gray-3 transition-all checked:border-transparent checked:bg-primary"
                    id="checkbox"
                    checked={checked}
                    onChange={onChange}
                    defaultChecked={defaultChecked}
                />
                <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-1 opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                    </svg>
                </span>
            </div>
            <label
                htmlFor="first-name"
                className="md:small2 text-small1 leading-150 text-white">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
