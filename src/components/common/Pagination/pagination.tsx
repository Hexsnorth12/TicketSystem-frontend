import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
interface PaginationProps {
    items: any[]
    pageLimit: number
}

interface PaginationState {
    pageNumber: number
    pageCount: number
    changePage: (pageNumber: number) => void
    pageData: () => any[]
    nextPage: () => void
    previousPage: () => void
}

const usePagination = (items: any[], pageLimit: number): PaginationState => {
    const [pageNumber, setPageNumber] = useState(0)
    const pageCount = Math.ceil(items.length / pageLimit)

    const changePage = (pageNumber: number) => {
        setPageNumber(pageNumber)
    }

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
        pageCount,
        pageData,
        nextPage,
        previousPage,
    } = usePagination(items, pageLimit)

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <ul>
                {pageData().map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div>
                Page {pageNumber + 1} of {pageCount}
            </div>
            <div className="flex flex-1 justify-between">
                <button
                    onClick={previousPage}
                    disabled={pageNumber === 0}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={pageNumber === pageCount - 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">{pageNumber + 1}</span> to{' '}
                        <span className="font-medium">{pageNumber + 10}</span>{' '}
                        of <span className="font-medium">97</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <a
                            href="#"
                            onClick={() => previousPage()}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                        <a
                            href="#"
                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {pageNumber + 1}
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            {pageNumber + 2}
                        </a>
                        {/* Add other page numbers here */}
                        <a
                            href="#"
                            onClick={() => nextPage()}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PaginationComponent
