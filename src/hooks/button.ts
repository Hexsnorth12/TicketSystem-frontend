import { useState } from 'react'

import { cn } from '@/utils'

export const useButton = (
    disabled: boolean | undefined,
    defaultWidth: number = 0,
    defaultHeight: number = 0,
) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    function _onEnterHandler() {
        setIsHovered(true)
    }

    function _onLeaveHandler() {
        setIsHovered(false)
    }

    function changeIconStyle(style: string = '') {
        return !isHovered && !disabled ? cn(style) : ''
    }

    function setIconDimension(
        dimension: { width: number; height: number } | undefined,
    ) {
        return {
            iconWidth: dimension?.width || defaultWidth,
            iconHeight: dimension?.height || defaultHeight,
        }
    }

    const basicButtonProps = {
        className: 'inline-block',
        onMouseEnter: _onEnterHandler,
        onMouseLeave: _onLeaveHandler,
    }

    return {
        changeIconStyle,
        setIconDimension,
        basicButtonProps,
    }
}
