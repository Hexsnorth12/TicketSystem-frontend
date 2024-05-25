'use client'
import React from 'react'

import { cn } from '@/utils'

import type { ButtonProps, FormButton } from '@/types'

const Button: React.FC<ButtonProps> = ({
    type,
    title,
    disabled,
    onClick,
    className,
    children,
    ...props
}) => {
    function isFormButton(
        buttonProps: Partial<ButtonProps>,
    ): buttonProps is Partial<FormButton> {
        return 'name' in buttonProps && 'value' in buttonProps
    }

    function extraProps() {
        if (isFormButton(props)) return { name: props.name, value: props.value }
    }

    function renderButtonContent() {
        if (isFormButton(props)) return props.value
        return children
    }

    function refactedClassName() {
        const isDisabled = disabled
            ? 'border-gray-2 bg-gray-2 text-gray-4'
            : 'border-primary hover:bg-primary hover:text-gray-1 bg-transparent text-white'
        const defaultStyle = `py-3 px-5 rounded-full border tracking-widest text-lg items-center ${isDisabled}`
        return cn(defaultStyle, className)
    }

    function onClickHandler(event: React.MouseEvent<HTMLElement>) {
        if (onClick && !disabled) onClick(event)
    }

    const elementProps = {
        type,
        title,
        disabled,
        onClick: onClickHandler,
        className: refactedClassName(),
        ...extraProps(),
    }
    const buttonContent = renderButtonContent()

    return <button {...elementProps}>{buttonContent}</button>
}

export default Button
