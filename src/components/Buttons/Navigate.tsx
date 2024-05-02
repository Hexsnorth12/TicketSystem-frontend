import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib/constants'

import type { NavigateButton } from '@/types'

const Navigate: React.FC<NavigateButton> = ({
    children,
    href,
    className,
    onClick,
    icon,
    iconStyle,
    iconDimension,
    disabled,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const buttonStyle = `flex gap-2 ${icon && 'pr-3'} ${className}`
    const { iconWidth, iconHeight } = setIconDimension()
    const img = iconImg()
    const iconClassName = changeIconStyle()

    function onEnterHandler() {
        setIsHovered(true)
    }

    function onLeaveHandler() {
        setIsHovered(false)
    }

    function changeIconStyle() {
        return !isHovered ? `invert ${iconStyle}` : iconStyle
    }

    function iconImg() {
        const { ICON, ICON_DISABLED } = BUTTONS.NAVIGATE
        return disabled ? ICON_DISABLED : ICON
    }

    function setIconDimension() {
        const { DEFAULT_ICON_WIDTH, DEFAULT_ICON_HEIGHT } = BUTTONS.NAVIGATE
        return {
            iconWidth: iconDimension?.width || DEFAULT_ICON_WIDTH,
            iconHeight: iconDimension?.height || DEFAULT_ICON_HEIGHT,
        }
    }

    return (
        <Link
            href={href}
            className="inline-block"
            onMouseEnter={onEnterHandler}
            onMouseLeave={onLeaveHandler}>
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

export default Navigate
