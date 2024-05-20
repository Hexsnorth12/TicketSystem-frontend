import React, { useState, ReactNode } from 'react'
import Pagination from './pagination'
import SimplePagination from './SimplePagination'

export default {
    title: 'common/Pagination',
    component: Pagination,
}

interface WithDataWrapperProps {
    children: ReactNode
}

const WithDataWrapper: React.FC<WithDataWrapperProps> = ({ children }) => (
    <div className="space-y-20">{children}</div>
)

const DataItem: React.FC<{ title: string }> = ({ title }) => (
    <div className="border border-gray-300 p-2">{title}</div>
)

const fakeData = [...Array(105).keys()].map((key) => ({
    id: key,
    title: `Index: ${key}`,
}))

export const Default = () => {
    const [page, setPage] = useState(1)
    return (
        <SimplePagination
            pageSize={20}
            page={page}
            total={100}
            onChange={setPage}
        />
    )
}

export const WithDataSource = () => {
    const pageSize = 20
    const [page, setPage] = useState(1)
    const [dataSource, setDataSource] = useState<
        { id: number; title: string }[]
    >([])

    const handleOnChange = (current: number) => {
        const max = current * pageSize
        const min = max - pageSize + 1
        setDataSource(
            fakeData.filter(
                (_data, index) => index + 1 >= min && index + 1 <= max,
            ),
        )
    }

    React.useLayoutEffect(() => {
        handleOnChange(page)
    }, [])

    return (
        <WithDataWrapper>
            <div style={{ height: 650 }}>
                {dataSource.map((data) => (
                    <DataItem key={data.id} title={data.title} />
                ))}
            </div>
            <SimplePagination
                page={page}
                pageSize={pageSize}
                total={fakeData.length}
                onChange={(current: number) => {
                    handleOnChange(current)
                    setPage(current)
                }}
            />
        </WithDataWrapper>
    )
}

export const WithEllipsis = () => {
    const [page, setPage] = useState(1)
    return (
        <Pagination
            page={page}
            pageSize={8}
            total={100}
            onChange={setPage}
            withEllipsis
        />
    )
}
