import React from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'

import type { FavoriteButton } from '@/types'
import { useButton } from '@/hooks/button'
import { useState } from 'react'
import { cn } from '@/utils'

const { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH, ICON_DISABLED } =
    BUTTONS.FAVORITE

export const FavoriteBtn: React.FC<FavoriteButton> = ({
    className,
    onClick,
    iconDimension,
    disabled,
    active,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const { setIconDimension } = useButton(
        disabled,
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
    )

    const defaultStyle = !disabled
        ? 'hover:border-secondary hover:bg-secondary'
        : ''
    const activeStyle = active ? 'border-secondary bg-secondary' : ''
    const buttonStyle = cn(
        'p-3 border-gray-2 bg-gray-2',
        defaultStyle,
        activeStyle,
        className,
    )

    const fill = isHovered || active ? 'white' : 'none'
    const { iconWidth, iconHeight } = setIconDimension(iconDimension)

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
                title="liked item"
                disabled={disabled}
                onClick={onClick}
                className={buttonStyle}>
                {!disabled && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={iconWidth}
                        height={iconHeight}
                        viewBox="0 0 48 48">
                        <path
                            fill={fill}
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                        />
                    </svg>
                )}
                {disabled && (
                    <Image
                        alt="disabled favorite heart icon"
                        src={ICON_DISABLED}
                        width={iconWidth}
                        height={iconHeight}
                    />
                )}
            </Button>
        </div>
    )
}

export default FavoriteBtn
