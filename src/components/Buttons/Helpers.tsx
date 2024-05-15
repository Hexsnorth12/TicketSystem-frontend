import React, { useState } from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'
import { useButton } from '@/hooks/button'

import type { HelpersButton } from '@/types'

const {
    DEFAULT_ICON_HEIGHT,
    DEFAULT_ICON_WIDTH,
    BACK_TO_TOP_ICON,
    BACK_TO_TOP_ICON_HOVER,
    BELL_ICON,
    CHATROOM_ICON,
    BACK_TO_TOP_DISABLED,
    BELL_DISABLED,
    CHATROOM_DISABLED,
    BACK_TP_TOP_ALT,
    BELL_ALT,
    CHATROOM_ALT,
    TYPES,
} = BUTTONS.HELPERS
const { SCROLL_TO_TOP, NOTIFICATION, CHATROOM } = TYPES

export const Helpers: React.FC<HelpersButton> = ({
    disabled,
    type,
    iconDimension,
    iconStyle,
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const { setIconDimension, changeIconStyle, basicButtonProps } = useButton(
        disabled,
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
    )

    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const imgSrcProps = renderSrcAlt(type)
    const iconClassName = changeIconStyle(iconStyle)
    const defaultStyle = buttonStyle()

    function buttonStyle() {
        let style = ''
        switch (type) {
            case NOTIFICATION:
            case CHATROOM:
                style = disabled
                    ? 'bg-gray-2 border-gray-2'
                    : 'bg-gray-3 border-gray-3 hover:bg-secondary hover:border-secondary'
                break
        }
        return style
    }

    function renderSrcAlt(type: string) {
        let img = ''
        let alt = ''
        switch (type) {
            case SCROLL_TO_TOP:
                img = disabled
                    ? BACK_TO_TOP_DISABLED
                    : isHovered
                      ? BACK_TO_TOP_ICON_HOVER
                      : BACK_TO_TOP_ICON
                alt = BACK_TP_TOP_ALT
                break
            case NOTIFICATION:
                img = disabled ? BELL_DISABLED : BELL_ICON
                alt = BELL_ALT
                break
            case CHATROOM:
                img = disabled ? CHATROOM_DISABLED : CHATROOM_ICON
                alt = CHATROOM_ALT
                break
        }
        return {
            img,
            alt,
        }
    }

    function onClickHandler() {
        switch (type) {
            case SCROLL_TO_TOP:
                scrollToTop()
                break
            case NOTIFICATION:
                getNotification()
                break
            case CHATROOM:
                getChatroom()
                break
        }
    }

    function mouseOverHandler() {
        !disabled && setIsHovered(true)
    }

    function mouseLeaveHandler() {
        !disabled && setIsHovered(false)
    }

    //未來添加相對應功能
    function scrollToTop() {}
    function getNotification() {}
    function getChatroom() {}

    return (
        <div
            {...basicButtonProps}
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}>
            <Button
                type="button"
                title={`helpers button - ${type}`}
                className={`p-4 ${defaultStyle}`}
                disabled={disabled}
                onClick={onClickHandler}>
                <Image
                    alt={imgSrcProps.alt}
                    src={imgSrcProps.img}
                    className={iconClassName}
                    width={iconWidth}
                    height={iconHeight}
                />
            </Button>
        </div>
    )
}
