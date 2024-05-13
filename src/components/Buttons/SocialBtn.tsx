import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'

import type { SocialButton } from '@/types'
import { useButton } from '@/hooks/button'

const {
    DEFAULT_ICON_HEIGHT,
    DEFAULT_ICON_WIDTH,
    TYPES,
    FACEBOOK_ALT,
    X_ALT,
    LINE_ALT,
    LINK_ALT,
    FACEBOOK_ICON,
    LINE_ICON,
    X_ICON,
    LINK_ICON,
} = BUTTONS.SOCIAL
const { FACEBOOK, X, LINE, LINK } = TYPES

export const SocialBtn: React.FC<SocialButton> = ({
    disabled,
    type,
    iconDimension,
    iconStyle,
}) => {
    const { setIconDimension, changeIconStyle, basicButtonProps } = useButton(
        disabled,
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
    )

    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const imgSrcProps = renderSrcAlt(type)
    const iconClassName = changeIconStyle(iconStyle)

    function renderSrcAlt(type: string) {
        let img = ''
        let alt = ''
        switch (type) {
            case FACEBOOK:
                img = FACEBOOK_ICON
                alt = FACEBOOK_ALT
                break
            case X:
                img = X_ICON
                alt = X_ALT
                break
            case LINE:
                img = LINE_ICON
                alt = LINE_ALT
                break
            case LINK:
                img = LINK_ICON
                alt = LINK_ALT
                break
        }
        return {
            img,
            alt,
        }
    }

    function onClickHandler() {
        openLink(type)
    }

    // 未來增加相對應連結
    function openLink(type: string) {}

    return (
        <div {...basicButtonProps}>
            <Button
                type="button"
                title={`social button - ${type}`}
                className="border-gray-4 p-2 hover:border-primary"
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
