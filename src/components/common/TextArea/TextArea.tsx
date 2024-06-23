'use client'
import React, { TextareaHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, Path } from 'react-hook-form'

interface TextAreaProps<T extends FieldValues>
    extends TextareaHTMLAttributes<HTMLInputElement> {
    label: string
    defaultValue?: string
    registerKey: Path<T>
    placeholder?: string
    required?: boolean
    register: UseFormRegister<T>
}

const TextArea: React.FC<TextAreaProps<FieldValues>> = ({
    label,
    registerKey,
    placeholder = '',
    required = false,
    register,
    defaultValue = '',
}) => {
    return (
        <div className="flex w-full flex-col gap-2 md:gap-4">
            <label
                htmlFor={registerKey}
                className="align-start text-small2 text-gray-5 md:text-small1">
                {label}
                {required ? <span className="text-primary">*</span> : null}
            </label>
            <div className="min-h-[120px] w-full rounded-lg border border-gray-3 bg-gray-3 py-2 pl-3 md:min-h-[200px] md:py-3 md:pl-4">
                <textarea
                    {...register(registerKey)}
                    name={registerKey}
                    id={registerKey}
                    className="h-full w-full resize-none bg-transparent pr-3 text-small2 text-white outline-none placeholder:text-gray-4 md:pr-4 md:text-body"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    )
}

export default TextArea
