import { useState } from 'react'

export const useButton = (defaultWidth: number, defaultHeight: number) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)

    function _onEnterHandler() {
        setIsHovered(true)
    }

    function _onLeaveHandler() {
        setIsHovered(false)
    }

    function changeIconStyle(style: string = '') {
        return !isHovered ? `invert ${style}` : style
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
