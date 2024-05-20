import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { usePagination } from '../../../hooks/usePagination'
/**
 * `Pagination` 是一個分頁元件，當頁面中一次要載入過多的資料時，載入及渲染將會花費更多的時間，
 * 因此，考慮分批載入資料的時候，需要分頁元件來幫助我們在不同頁面之間切換。
 */
interface PaginationProps {
    page: number
    withEllipsis?: boolean
    pageSize: number | undefined
    total: number
    onChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    pageSize,
    total,
    onChange,
}) => {
    const { items, totalPage, handleClickNext, handleClickPrev } =
        usePagination({
            page,
            pageSize,
            withEllipsis: false,
            total,
            onChange,
        })

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-inherit px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                            disabled={page === 1}
                            type="button"
                            onClick={handleClickPrev}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${page === 0 ? 'text-gray-4' : 'text-white '} focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        {items.map((item) => {
                            return (
                                <button
                                    key={item.page}
                                    onClick={item.onClick} // 不需要對頁數進行更改
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${item.isCurrent ? 'bg-gray-3 text-primary' : 'text-white'} rounded-lg  hover:bg-gray-3 focus:z-20 focus:outline-offset-0`}>
                                    {item.page}
                                </button>
                            )
                        })}
                        <button
                            type="button"
                            disabled={page === totalPage}
                            onClick={handleClickNext}
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
