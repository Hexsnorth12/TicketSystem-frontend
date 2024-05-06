import { cn } from '@/utils'
import { Button } from '../common'

import type { TagButton } from '@/types'

export const SearchTag: React.FC<TagButton> = ({
    children,
    disabled,
    onClick,
    active,
}) => {
    function style() {
        const defaultStyle = 'border-gray-4 px-4 py-2 text-base'
        const hoverStyle =
            !disabled && 'hover:bg-gray-4 hover:text-white hover:border-gray-4'
        const activeStyle = active && 'text-black bg-primary border-primary'
        return cn(defaultStyle, hoverStyle, activeStyle)
    }
    const className = style()

    return (
        <Button
            type="button"
            title="tag"
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </Button>
    )
}
