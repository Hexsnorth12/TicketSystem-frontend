import React from 'react'
import Image from 'next/image'

import { Button } from '../common'
import { BUTTONS } from '@/lib'

import type { SearchButton } from '@/types'
import { useButton } from '@/hooks/button'

const {
    DEFAULT_ICON_HEIGHT,
    DEFAULT_ICON_WIDTH,
    TYPES,
    SEARCH_ALT,
    FILTER_ALT,
    RECOMMED_ALT,
    SEARCH_ICON,
    FILTER_ICON,
    RECOMMED_ICON,
} = BUTTONS.SEARCH

const { SEARCH, FILTER, RECOMMED } = TYPES

export const SearchBtn: React.FC<SearchButton> = ({
    disabled,
    type,
    onClick,
    iconDimension,
    active,
    iconStyle,
}) => {
    const { setIconDimension, changeIconStyle } = useButton(
        disabled,
        DEFAULT_ICON_WIDTH,
        DEFAULT_ICON_HEIGHT,
    )

    const activeStyle = active ? 'border-secondary bg-secondary' : ''

    const { iconWidth, iconHeight } = setIconDimension(iconDimension)
    const imgSrcProps = renderSrcAlt(type)
    const iconClassName = changeIconStyle(iconStyle)

    function renderSrcAlt(type: string) {
        let img = ''
        let alt = ''
        switch (type) {
            case SEARCH:
                img = SEARCH_ICON
                alt = SEARCH_ALT
                break
            case FILTER:
                img = FILTER_ICON
                alt = FILTER_ALT
                break
            case RECOMMED:
                img = RECOMMED_ICON
                alt = RECOMMED_ALT
                break
        }
        return {
            img,
            alt,
        }
    }

    return (
        <div className="inline-block">
            <Button
                type="button"
                title={`social button - ${type}`}
                className={`border-gray-4 bg-gray-3 p-2 hover:border-primary ${activeStyle}`}
                disabled={disabled}
                onClick={onClick}>
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
