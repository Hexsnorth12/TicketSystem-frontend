import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
interface PaginationProps {
    items: string[]
    pageLimit: number
}

interface PaginationState {
    pageNumber: number
    pageCount: number
    changePage: (pageNumber: number) => void
    pageNumbers: number[]
    pageData: () => string[]
    nextPage: () => void
    previousPage: () => void
}

const usePagination = (items: string[], pageLimit: number): PaginationState => {
    const [pageNumber, setPageNumber] = useState(0)
    const pageCount = Math.ceil(items.length / pageLimit)
    const changePage = (pageNumber: number) => {
        setPageNumber(pageNumber - 1) // 減 1，因為頁數是從 1 開始
    }
    const pageNumbers = Array.from(Array(pageCount).keys()).map(
        (number) => number + 1,
    )

    const pageData = () => {
        const startIndex = pageNumber * pageLimit
        const endIndex = Math.min(startIndex + pageLimit, items.length)
        return items.slice(startIndex, endIndex)
    }

    const nextPage = () => {
        setPageNumber(Math.min(pageNumber + 1, pageCount - 1))
    }

    const previousPage = () => {
        setPageNumber(Math.max(pageNumber - 1, 0))
    }

    return {
        pageNumber,
        pageCount,
        changePage,
        pageNumbers,
        pageData,
        nextPage,
        previousPage,
    }
}

const PaginationComponent: React.FC<PaginationProps> = ({
    items,
    pageLimit,
}) => {
    const {
        pageNumber,
        changePage,
        pageNumbers,
        pageCount,
        // pageData,
        nextPage,
        previousPage,
    } = usePagination(items, pageLimit)

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-inherit px-4 py-3 sm:px-6">
            {/* <ul>
                {pageData().map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div>
                Page {pageNumber + 1} of {pageCount}
            </div> */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                            disabled={pageNumber === 0}
                            onClick={previousPage}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${pageNumber === 0 ? 'text-gray-4' : 'text-white '} focus:z-20 focus:outline-offset-0`}>
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => changePage(number)} // 不需要對頁數進行更改
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNumber + 1 === number ? 'bg-gray-3 text-primary' : 'text-white'} rounded-lg  hover:bg-gray-3 focus:z-20 focus:outline-offset-0`}>
                                {number}
                            </button>
                        ))}
                        <button
                            disabled={pageNumber === pageCount - 1}
                            onClick={nextPage}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${pageNumber === pageCount - 1 ? 'text-gray-4' : 'text-white '}   focus:z-20 focus:outline-offset-0`}>
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

export default PaginationComponent
