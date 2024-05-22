import React from 'react'

import type { TypeTag as TypeTagProps } from '@/types'

export const TypeTag: React.FC<TypeTagProps> = ({ tagName }) => {
    return (
        <div
            title={`tag - ${tagName}`}
            className="rounded border-0 bg-gray-3 px-3 py-1 text-sm">
            {tagName}
        </div>
    )
}
