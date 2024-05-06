import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib/constants'

import type { NavigateButton } from '@/types'
import { useButton } from '@/hooks/button'

const { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH, ICON, ICON_DISABLED } =
    BUTTONS.NAVIGATE

export const Navigate: React.FC<NavigateButton> = ({
    children,
    href,
    className,
    onClick,
    icon,
    iconStyle,
    iconDimension,
    disabled,
}) => {
    const { setIconDimension, changeIconStyle, basicButtonProps } = useButton(
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
        disabled,
    )

    const buttonStyle = `flex gap-2 ${icon && 'pr-3'} ${className}`
    const img = iconImg()
    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const iconClassName = changeIconStyle(iconStyle)

    function iconImg() {
        return disabled ? ICON_DISABLED : ICON
    }

    return (
        <Link href={href} {...basicButtonProps}>
            <Button
                type="button"
                title="navigation"
                disabled={disabled}
                onClick={onClick}
                className={buttonStyle}>
                {children}
                {icon && (
                    <Image
                        alt="Navigation icon"
                        src={img}
                        className={iconClassName}
                        width={iconWidth}
                        height={iconHeight}
                    />
                )}
            </Button>
        </Link>
    )
}
