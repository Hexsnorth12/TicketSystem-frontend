'use client'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'

interface InputProps {
    columns: []
    dataSource: []
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
    return (
        <TableContainer>
            <Table
                className="min-w-full md:w-full"
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell key={column.key}>
                                {column.title}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSource.map((data) => (
                        <TableRow key={data.key}>
                            {columns.map((column) => {
                                const { dataIndex } = column
                                const foundCellData = column.render
                                    ? column.render(data[dataIndex])
                                    : data[dataIndex]
                                return (
                                    <StyledTableCell key={column.key}>
                                        {foundCellData}
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
