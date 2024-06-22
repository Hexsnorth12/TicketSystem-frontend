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
import { HeadCell } from '@/types/table'

interface DataTableHeaderProps {
    headCells: HeadCell[]
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ headCells }) => {
    return (
        <>
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
                    {/* <TableCell
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
                    </TableCell> */}
                </TableRow>
            </TableHead>
        </>
    )
}

export default DataTableHeader
