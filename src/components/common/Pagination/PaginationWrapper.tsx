'use client'

import React, { useState } from 'react'
import { Pagination } from '@/components/common'

interface PaginationWrapperProps {
    url: string
    payload: { userId: string }
    size: number
    total: number
    withEllipsis?: boolean
}

const PaginationWrapper: React.FC<PaginationWrapperProps> = (props) => {
    const { size, total, withEllipsis = false } = props
    const [currentIndex] = useState(1)
    return (
        <>
            <Pagination
                withEllipsis={withEllipsis}
                page={currentIndex}
                pageSize={size}
                total={total}
                onChange={(number) => {
                    console.log(number)
                }}
            />
        </>
    )
}

export default PaginationWrapper
