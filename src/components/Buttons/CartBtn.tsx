import { useState } from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'
import { useButton } from '@/hooks/button'
import { cn } from '@/utils'

import type { CartButton } from '@/types'

const { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH, ICON_DISABLED, ICON } =
    BUTTONS.CART

export const CartBtn: React.FC<CartButton> = ({
    amount,
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

    const amountStyle = renderAmountStyle()
    const buttonStyle = renderButtonStyle()
    const img = renderImg()
    const { iconWidth, iconHeight } = setIconDimension(iconDimension)

    function renderAmountStyle() {
        const amountDefaultStyle =
            'absolute right-[-6px] top-[-6px] bg-secondary px-2 text-white rounded-full'
        const amountHoverStyle = isHovered ? 'text-black bg-primary' : ''
        const amountDisabledStyle = disabled ? 'bg-gray-2 text-gray-4' : ''
        return cn(amountDefaultStyle, amountHoverStyle, amountDisabledStyle)
    }

    function renderButtonStyle() {
        const buttonDefaultStyle = 'border-0 p-2 hover:bg-trandparent'
        return cn(buttonDefaultStyle, className)
    }

    function renderImg() {
        return !disabled ? ICON : ICON_DISABLED
    }

    function mouseOverHandler() {
        !disabled && setIsHovered(true)
    }

    function mouseLeaveHandler() {
        !disabled && setIsHovered(false)
    }

    return (
        <div
            className="relative inline-block"
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}>
            <Button
                type="button"
                title="cart button"
                disabled={disabled}
                onClick={onClick}
                className={buttonStyle}>
                <Image
                    alt="cart icon"
                    src={img}
                    width={iconWidth}
                    height={iconHeight}
                />
            </Button>
            <div className={amountStyle}>{amount}</div>
        </div>
    )
}
