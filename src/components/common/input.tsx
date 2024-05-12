import React from 'react'
interface InputProps {
    label?: string
    type: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

const InputComponent: React.FC<InputProps> = ({
    label,
    type,
    value,
    placeholder,
    onChange,
}) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-2.5">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[35px] w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary "
                />
            </div>
        </div>
    )
}

export default InputComponent
