'use client'

import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import {
    UseFormRegister,
    FieldValues,
    Path,
    FieldErrors,
} from 'react-hook-form'

interface InputProps<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    type: string
    placeholder?: string
    theme?: 'light' | 'dark'
    required?: boolean
    registerKey: Path<T>
    register: UseFormRegister<T>
}

const InputRegister = <T extends FieldValues>({
    label,
    type,
    placeholder = '',
    theme = 'dark',
    required = false,
    register,
    registerKey,
}: InputProps<T>): JSX.Element => {
    if (!register) {
        throw new Error('"register" prop is required for InputComponent')
    }
    if (!registerKey) {
        throw new Error('"key" prop is required for InputComponent')
    }
    return (
        <div className="w-full">
            <label
                htmlFor={label}
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
                    {...register(registerKey)}
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

export default InputRegister
