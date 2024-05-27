'use client'

import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePagination } from '../../../hooks/usePagination'
/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
 */
interface PaginationProps {
    withEllipsis?: boolean
    page: number
    pageSize: number
    total: number
    onChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    withEllipsis,
    page,
    pageSize,
    total,
    onChange,
}) => {
    const { items, totalPage, handleClickNext, handleClickPrev } =
        usePagination({
            page,
            pageSize,
            total,
            withEllipsis,
            onChange,
        })

    return (
        <div className="flex items-center justify-between bg-inherit px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav
                        className="isolate inline-flex gap-3 -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                            disabled={page === 1}
                            onClick={page === 1 ? undefined : handleClickPrev}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${page === 0 ? 'text-gray-4' : 'text-white '} focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        {items.map((item) => {
                            if (item.type === 'page') {
                                return (
                                    <button
                                        key={item.page}
                                        // $isCurrent={item.isCurrent}
                                        onClick={item.onClick}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${item.isCurrent ? 'text-primary' : 'text-white'} rounded-lg hover:bg-gray-300 focus:z-20 focus:outline-offset-0 ${item.isCurrent ? 'bg-gray-3 text-primary' : 'text-white'}`}>
                                        {item.page}
                                    </button>
                                )
                            }
                            return (
                                <div key={item.page} className="text-white">
                                    ...
                                </div>
                            )
                        })}
                        <button
                            disabled={page === totalPage}
                            onClick={
                                page === totalPage ? undefined : handleClickNext
                            }
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${page === page - 1 ? 'text-gray-4' : 'text-white '}   focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Pagination
