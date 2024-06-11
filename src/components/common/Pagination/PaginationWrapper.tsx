'use client'

import React from 'react'
import { Pagination } from '@/components/common'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface PaginationWrapperProps {
    url?: string // 這個不用
    payload?: { userId: string } // 這個不用
    size: number
    total: number
    withEllipsis?: boolean
    page?: number
}

const PaginationWrapper: React.FC<PaginationWrapperProps> = (props) => {
    const { size, total, withEllipsis = false } = props
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page') || 1)
    const pathname = usePathname()
    const router = useRouter()
    console.log('searchParams', pathname)
    const handlePageChange = (page: number) => {
        router.push(`${pathname}?page=${page}`)
    }

    return (
        <>
            <Pagination
                withEllipsis={withEllipsis}
                page={currentPage}
                pageSize={size}
                total={total}
                onChange={handlePageChange}
            />
        </>
    )
}

export default PaginationWrapper
