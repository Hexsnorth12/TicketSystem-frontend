'use client'

import React, { InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import {
    UseFormRegister,
    FieldValues,
    Path,
    FieldErrors,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface InputProps<T extends FieldValues>
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    type: string
    placeholder?: string
    registerKey: Path<T>
    register: UseFormRegister<T>
    errors?: FieldErrors<FieldValues>
    theme?: 'light' | 'dark'
    required?: boolean
    defaultValue?: string | number
}

const InputRegister = <T extends FieldValues>({
    label,
    type,
    placeholder = '',
    theme = 'dark',
    required = false,
    register,
    registerKey,
    defaultValue = '',
    errors,
}: InputProps<T>): JSX.Element => {
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
            <div className="mt-2 md:mt-2.5">
                <input
                    {...(register(registerKey), { defaultValue })}
                    type={type}
                    className={clsx(
                        'ring-black-300/10 block min-h-[49px] w-full rounded-md  bg-gray-1 px-2.5 py-2 text-small2 leading-150 text-white shadow-sm outline outline-1 outline-gray-3 ring-1 placeholder:text-gray-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:px-4 md:py-2.5 md:text-body',
                        {
                            'text-gray-900': theme === 'light',
                            'bg-opacity-0': theme === 'light',
                        },
                    )}
                    placeholder={placeholder}
                    name={registerKey}
                />
                <ErrorMessage
                    name={registerKey}
                    errors={errors}
                    render={({ message }) => (
                        <p className="text-red-600">{message}</p>
                    )}
                />
            </div>
        </div>
    )
}

export default InputRegister
