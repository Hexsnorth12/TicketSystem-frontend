import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib/constants'

import type { HelpersButton } from '@/types'
import { useButton } from '@/hooks/button'

const {
    DEFAULT_ICON_HEIGHT,
    DEFAULT_ICON_WIDTH,
    BACK_TO_TOP_ICON,
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
}) => {
    const { setIconDimension, changeIconStyle, basicButtonProps } = useButton(
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
        disabled,
    )

    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const imgSrcProps = renderSrcAlt(type)
    const iconClassName = changeIconStyle()

    function renderSrcAlt(type: string) {
        let img = ''
        let alt = ''
        switch (type) {
            case SCROLL_TO_TOP:
                img = disabled ? BACK_TO_TOP_DISABLED : BACK_TO_TOP_ICON
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

    //未來添加相對應功能
    function scrollToTop() {}
    function getNotification() {}
    function getChatroom() {}

    return (
        <div {...basicButtonProps}>
            <Button
                type="button"
                title={`helpers button - ${type}`}
                className="p-4"
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
