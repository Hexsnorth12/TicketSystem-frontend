import React, { ReactNode } from 'react'
import { cn } from '@/utils'

interface TextFieldProps {
    children: ReactNode
    label: string
    containerStyle?: string
    labelStyle?: string
}

const TextField: React.FC<TextFieldProps> = ({
    children,
    label,
    containerStyle,
    labelStyle,
}) => {
    return (
        <div
            className={cn(
                'mb-3 pb-3 md:mb-6 md:pb-6',
                containerStyle,
            )}>
            <p
                className={cn(
                    'mb-2 text-small2 leading-150 text-gray-5 md:mb-3 md:text-small1',
                    labelStyle,
                )}>
                {label}
            </p>
            {children}
        </div>
    )
}

export default TextField
