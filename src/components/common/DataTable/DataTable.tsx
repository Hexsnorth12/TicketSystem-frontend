'use client'

import React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box } from '@mui/material'
import { bellota, noto_Sans_TC } from '@/components/fonts'
import DataTableHeader from './DataTableHeader'
import { HeadCell } from '@/types/table'

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     textWrap: 'wrap',
//     textAlign: 'start',
// }))

// const StyledCell = styled(TableCell)(({ theme }) => ({
//     flex: 1,
// }))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    color: 'white',
    '& .MuiTableCell-root': {
        fontSize: 14,
        color: 'white',
    },
}))

interface DataTableProps {
    headCells: HeadCell[]
    rows: { [k: string]: string | number }[]
}

// function createData(
//     date: string,
//     rating: number,
//     acc: string,
//     carbs: string,
//     protein: number,
// ) {
//     return { date, rating, acc, carbs, protein }
// }

// const rows = [
//     createData(
//         '2023.08.09 11:32',
//         5,
//         'asdfasd',
//         '我們非常喜歡這次旅行，它提供了豐富的信息，甚至可以讓您進入一些大廳和音樂會場地。從透過Klook客路預訂，到現場兌換門票，再到遊覽，整個體驗都是無縫的。這是專業進行的，當然非常值得花時間。',
//         4.0,
//     ),
//     createData(
//         '2023.08.09 11:32',
//         5,
//         'asdfasd',
//         '我們非常喜歡這次旅行，它提供了豐富的信息，甚至可以讓您進入一些大廳和音樂會場地。從透過Klook客路預訂，到現場兌換門票，再到遊覽，整個體驗都是無縫的。這是專業進行的，當然非常值得花時間。',
//         4.0,
//     ),
// ]

const DataTable: React.FC<DataTableProps> = ({ headCells, rows }) => {
    return (
        <>
            {/* <div className="overflow-x-scroll bg-transparent p-8 scrollbar-hidden"></div> */}
            <TableContainer
                component={Paper}
                sx={{
                    backgroundColor: 'transparent',
                    maxHeight: 440,
                }}
                className="scrollbar-hidden">
                <Table
                    stickyHeader
                    sx={
                        {
                            // width: '100%',
                            // minWidth: 320,
                            // tableLayout: 'fixed',
                        }
                    }
                    aria-label="simple table">
                    <TableHead
                        sx={{
                            backgroundColor: 'transparent',
                            // borderWidth: 0,
                            // BorderRadius: 12,
                        }}>
                        <TableRow
                            sx={{
                                // borderWidth: 0,
                                // borderRadius: 8,
                                backgroundColor: 'transparent',
                            }}>
                            {headCells.map((headCell, index) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        textWrap: 'nowrap',
                                        borderWidth: 0,
                                        color: 'white',
                                        backgroundColor: '#1E1E1E',
                                        ...(index === 0 && {
                                            borderTopLeftRadius: 8,
                                            borderBottomLeftRadius: 8,
                                        }),
                                        ...(index === headCells.length - 1 && {
                                            borderTopRightRadius: 8,
                                            borderBottomRightRadius: 8,
                                        }),
                                    }}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.date}
                                sx={{
                                    '& td, & th': {
                                        borderBottom: 1,
                                        borderBottomColor: '#333333',
                                    },
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}>
                                {Object.keys(row).map((key) => (
                                    <TableCell
                                        key={key}
                                        component="th"
                                        scope="row"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textWrap: 'nowrap',
                                            //overflow: 'hidden',
                                            fontFamily:
                                                typeof row[key] === 'string'
                                                    ? 'Noto_Sans_TC'
                                                    : 'Bellota',
                                        }}>
                                        {row[key]}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DataTable
