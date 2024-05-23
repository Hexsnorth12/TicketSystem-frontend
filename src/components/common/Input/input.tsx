'use client'

import React from 'react'
import clsx from 'clsx'

interface InputProps {
    label?: string
    type: string
    value: string
    placeholder?: string
    onChange: (value: string) => void
    theme?: 'light' | 'dark'
    required?: boolean
    name?: string
}

const InputComponent: React.FC<InputProps> = ({
    label,
    type,
    value,
    placeholder = '',
    onChange,
    theme = 'dark',
    required = false,
    name = '',
}) => {
    return (
        <div>
            <label
                htmlFor={name}
                className={clsx(
                    'block text-small2 leading-150 text-white md:text-small1',
                    {
                        'text-gray-900': theme === 'light',
                    },
                )}>
                {label}
                {required ? <span className="text-primary">*</span> : null}
            </label>
            <div className="mt-2  md:mt-2.5">
                <input
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type={type}
                    className={clsx(
                        'border-1 ring-black-300/10 block w-full rounded-md border-gray-3 bg-gray-1 px-2.5 py-2 text-small2 leading-150 text-white shadow-sm ring-1 placeholder:text-gray-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:px-4 md:py-2.5 md:text-body',
                        {
                            'text-gray-900': theme === 'light',
                            'bg-opacity-0': theme === 'light',
                        },
                    )}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default InputComponent
