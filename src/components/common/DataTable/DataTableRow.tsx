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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textWrap: 'wrap',
    textAlign: 'start',
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
    flex: 1,
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    color: 'white',
    '& .MuiTableCell-root': {
        fontSize: 14,
        color: 'white',
    },
}))

interface DataTableHeaderProps {}

function createData(
    date: string,
    rating: number,
    acc: string,
    carbs: string,
    protein: number,
) {
    return { date, rating, acc, carbs, protein }
}

const rows = [
    createData(
        '2023.08.09 11:32',
        5,
        'asdfasd',
        '我們非常喜歡這次旅行，它提供了豐富的信息，甚至可以讓您進入一些大廳和音樂會場地。從透過Klook客路預訂，到現場兌換門票，再到遊覽，整個體驗都是無縫的。這是專業進行的，當然非常值得花時間。',
        4.0,
    ),
    createData(
        '2023.08.09 11:32',
        5,
        'asdfasd',
        '我們非常喜歡這次旅行，它提供了豐富的信息，甚至可以讓您進入一些大廳和音樂會場地。從透過Klook客路預訂，到現場兌換門票，再到遊覽，整個體驗都是無縫的。這是專業進行的，當然非常值得花時間。',
        4.0,
    ),
]

const DataTableHeader: React.FC<DataTableHeaderProps> = () => {
    return (
        <>
            {/* <div className="overflow-x-scroll bg-transparent p-8 scrollbar-hidden">

            </div> */}
            <TableContainer
                component={Paper}
                sx={{ backgroundColor: 'transparent', maxHeight: 440 }}>
                <Table
                    stickyHeader
                    sx={{
                        // width: '100%',
                        // minWidth: 320,
                        tableLayout: 'fixed',
                    }}
                    aria-label="simple table">
                    <TableHead
                        sx={{
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                            BorderRadius: 12,
                        }}>
                        <TableRow
                            sx={{
                                borderWidth: 0,
                                borderRadius: 8,
                                backgroundColor: 'transparent',
                            }}>
                            <TableCell
                                sx={{
                                    borderWidth: 0,
                                    color: 'white',
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    backgroundColor: '#1E1E1E',
                                }}>
                                日期
                            </TableCell>
                            <TableCell
                                sx={{
                                    borderWidth: 0,
                                    color: 'white',
                                    backgroundColor: '#1E1E1E',
                                }}
                                align="right">
                                星等
                            </TableCell>
                            <TableCell
                                sx={{
                                    borderWidth: 0,
                                    color: 'white',
                                    backgroundColor: '#1E1E1E',
                                }}
                                align="right">
                                帳號
                            </TableCell>
                            <TableCell
                                sx={{
                                    borderWidth: 0,
                                    color: 'white',
                                    backgroundColor: '#1E1E1E',
                                }}
                                align="right">
                                備註
                            </TableCell>
                            <TableCell
                                sx={{
                                    borderWidth: 0,
                                    color: 'white',
                                    borderTopRightRadius: 8,
                                    borderBottomRightRadius: 8,
                                    backgroundColor: '#1E1E1E',
                                }}
                                align="right">
                                狀態
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.date}
                                // className={bellota.className}
                                sx={{
                                    '& td, & th': {
                                        borderBottom: 1,
                                        borderBottomColor: '#333333',
                                    },
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontFamily: 'Bellota',
                                    }}>
                                    {row.date}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontFamily: 'Bellota',
                                    }}>
                                    {row.rating}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontFamily: 'Bellota',
                                    }}>
                                    {row.acc}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontFamily: 'noto_Sans_TC',
                                        textAlign: 'start',
                                    }}>
                                    {row.carbs}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{
                                        fontFamily: 'Bellota',
                                    }}>
                                    {row.protein}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DataTableHeader
