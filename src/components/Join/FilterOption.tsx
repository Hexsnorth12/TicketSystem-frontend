'use client'
import React from 'react'

import type { FilterOption as Props } from '@/types'

const FilterOption: React.FC<Props> = ({ title, filter }) => {
    return (
        <div>
            {/* title */}
            <p className="text-samll1 mb-3 text-white">{title}</p>
            {filter}
        </div>
    )
}

export default FilterOption
