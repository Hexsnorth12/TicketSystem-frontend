import { useState } from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'
import { useButton } from '@/hooks/button'
import { cn } from '@/utils'

import type { ArrowButton } from '@/types'

const {
    DEFAULT_ICON_HEIGHT,
    DEFAULT_ICON_WIDTH,
    DEFAULT_OUTLINE_ICON_WIDTH,
    DEFAULT_OUTLINE_ICON_HEIGHT,
    TYPES,
    RIGHT_ICON,
    RIGHT_ALT,
    RIGHT_OUTLINE_ICON,
    RIGHT_OUTLINE_ICON_HOVER,
    RIGHT_OUTLINE_ALT,
    LEFT_ICON,
    LEFT_ALT,
    LEFT_OUTLINE_ICON,
    LEFT_OUTLINE_ICON_HOVER,
    LEFT_OUTLINE_ALT,
} = BUTTONS.ARROWS
const { RIGHT, RIGHT_OUTLINE, LEFT, LEFT_OUTLINE } = TYPES

export const ArrowBtns: React.FC<ArrowButton> = ({
    type,
    disabled,
    className,
    iconDimension,
    onClick,
    iconStyle,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const defaultDimension = setDefaultDimension()
    const { setIconDimension, changeIconStyle } = useButton(
        disabled,
        defaultDimension.width,
        defaultDimension.height,
    )

    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const imgSrcProps = renderSrcAlt(type)
    const iconClassName = changeIconStyle(iconStyle)
    const buttonStyle = renderbuttonStyle()

    function setDefaultDimension() {
        let width = DEFAULT_ICON_WIDTH
        let height = DEFAULT_ICON_HEIGHT

        if (type === RIGHT_OUTLINE || type === LEFT_OUTLINE) {
            width = DEFAULT_OUTLINE_ICON_WIDTH
            height = DEFAULT_OUTLINE_ICON_HEIGHT
        }
        return { width, height }
    }

    function renderbuttonStyle() {
        let defaultStyle = ''
        switch (type) {
            case RIGHT:
            case LEFT:
                defaultStyle = 'p-4'
                break
            case RIGHT_OUTLINE:
            case LEFT_OUTLINE:
                defaultStyle =
                    'py-3 px-6 rounded-none border-0 hover:bg-transparent'
                break
        }
        return cn(defaultStyle, className)
    }

    function renderSrcAlt(type: string) {
        let img = ''
        let alt = ''
        switch (type) {
            case RIGHT:
                img = RIGHT_ICON
                alt = RIGHT_ALT
                break
            case RIGHT_OUTLINE:
                img = isHovered ? RIGHT_OUTLINE_ICON_HOVER : RIGHT_OUTLINE_ICON
                alt = RIGHT_OUTLINE_ALT
                break
            case LEFT:
                img = LEFT_ICON
                alt = LEFT_ALT
                break
            case LEFT_OUTLINE:
                img = isHovered ? LEFT_OUTLINE_ICON_HOVER : LEFT_OUTLINE_ICON
                alt = LEFT_OUTLINE_ALT
                break
        }
        return { img, alt }
    }

    function onClickHandler() {
        if (onClick) !disabled && onClick()
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
                title={`arrow button - ${type}`}
                className={buttonStyle}
                disabled={disabled}
                onClick={onClickHandler}>
                <Image
                    alt={imgSrcProps.alt}
                    src={imgSrcProps.img}
                    className={iconClassName}
                    width={iconWidth}
                    height={iconHeight}
                    style={{ width: '100%', height: 'auto' }}
                />
            </Button>
        </div>
    )
}
