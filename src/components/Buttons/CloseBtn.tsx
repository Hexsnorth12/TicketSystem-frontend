import React from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'

import type { CloseButton } from '@/types'
import { useButton } from '@/hooks/button'
import { useState } from 'react'
import { cn } from '@/utils'

const { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH, ICON, ICON_DISABLED } =
    BUTTONS.CLOSE

export const CloseBtn: React.FC<CloseButton> = ({
    className,
    onClick,
    iconDimension,
    disabled,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const { setIconDimension } = useButton(
        disabled,
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
    )

    const defaultStyle = !disabled ? 'hover:border-0 hover:bg-transparent' : ''
    const brightness = !isHovered && !disabled ? 'brightness-50' : ''
    const buttonStyle = cn('p-0 border-0', defaultStyle, brightness, className)

    const img = iconImg()
    const { iconWidth, iconHeight } = setIconDimension(iconDimension)

    function iconImg() {
        return disabled ? ICON_DISABLED : ICON
    }

    function mouseOverHandler() {
        !disabled && setIsHovered(true)
    }

    function mouseLeaveHandler() {
        !disabled && setIsHovered(false)
    }

    return (
        <div
            className="inline-block"
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}>
            <Button
                type="button"
                title="close"
                disabled={disabled}
                onClick={onClick}
                className={buttonStyle}>
                <Image
                    alt="close icon"
                    src={img}
                    width={iconWidth}
                    height={iconHeight}
                />
            </Button>
        </div>
    )
}
