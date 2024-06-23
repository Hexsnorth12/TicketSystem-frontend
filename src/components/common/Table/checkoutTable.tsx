'use client'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Chip from '@/components/common/Chip/chip'
import { DataSource, Column, UserProductPlan } from '@/types/cart'
interface InputProps {
    columns: Column[]
    dataSource: DataSource[]
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        color: theme.palette.common.white,
    },
}))

const TableComponent: React.FC<InputProps> = ({ columns, dataSource }) => {
    const renderName = (name: {
        image: string
        title: string
        subtitle: string
    }) => (
        <div className="flex items-center justify-start">
            <div className="grid grid-flow-col grid-rows-2 items-center gap-4">
                <div className="row-span-2 flex justify-center">
                    <Image
                        src={name.image}
                        alt={name.title}
                        width={100}
                        height={100}
                        className="rounded-lg"
                    />
                </div>
                <div className="col-span-1 flex justify-start truncate text-body md:text-xl">
                    <div>{name.title}</div>
                </div>
                <div className="col-span-1 flex justify-start">
                    {name.subtitle}
                </div>
            </div>
        </div>
    )

    const renderCellData = (
        cellData:
            | string
            | number
            | { image: string; title: string; subtitle: string }
            | UserProductPlan
            | undefined,
    ) => {
        if (typeof cellData === 'object' && cellData !== null) {
            if (
                'image' in cellData &&
                'title' in cellData &&
                'subtitle' in cellData
            ) {
                return renderName(cellData)
            } else if (
                'name' in cellData &&
                'discount' in cellData &&
                'headCount' in cellData
            ) {
                return (
                    <div>
                        <div>{cellData.name}</div>
                        <div>
                            {cellData.discount}% off for {cellData.headCount}{' '}
                            people
                        </div>
                    </div>
                )
            }
            return JSON.stringify(cellData)
        }
        return cellData
    }

    return (
        <TableContainer>
            <Table className="min-w-full" aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell key={column.key}>
                                {column.title}
                            </StyledTableCell>
                        ))}
                        <StyledTableCell>動作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSource.map((data) => (
                        <TableRow key={data.key}>
                            {columns.map((column) => {
                                const cellData =
                                    data[column.dataIndex as keyof DataSource]
                                return (
                                    <StyledTableCell key={column.key}>
                                        {column.dataIndex === 'number' ? (
                                            <Chip value={`${data.number}`} />
                                        ) : column.dataIndex === 'price' ? (
                                            `${data.number * data.price} NT`
                                        ) : (
                                            renderCellData(cellData)
                                        )}
                                    </StyledTableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent
