'use client'

import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Checkbox } from '@mui/material'
import { HeadCell } from '@/types/table'
import { Button } from '@/components/common'
import { useAlert } from '@/components/useAlert/useAlert'
const StyledTableRow = styled(TableRow)(() => ({
    color: 'white',
    '& .MuiTableCell-root': {
        fontSize: 14,
        color: 'white',
    },
}))

interface DataTableProps {
    headCells: HeadCell[]
    rows: { id: string; [k: string]: string | number }[]
    hasCheckbox?: boolean
    onSubmit?: (ids: string[]) => void
}

const DataTable: React.FC<DataTableProps> = ({
    headCells,
    rows,
    hasCheckbox = false,
    onSubmit,
}) => {
    const [selected, setSelected] = useState<string[]>([])
    const showAlert = useAlert()
    // const handleSelectAllClick = (
    //     event: React.ChangeEvent<HTMLInputElement>,
    // ) => {
    //     if (event.target.checked) {
    //         const newSelected = rows.map((n) => n.id)
    //         setSelected(newSelected)
    //         return
    //     }
    //     setSelected([])
    // }
    const handleClick = (id: string) => {
        if (!hasCheckbox) return

        const selectedIndex = selected.indexOf(id)
        let newSelected: string[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
        setSelected(newSelected)
        showAlert('核銷成功', 'success')
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1

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
                            role="checkbox"
                            sx={{
                                // borderWidth: 0,
                                // borderRadius: 8,
                                backgroundColor: 'transparent',
                            }}>
                            {hasCheckbox ? (
                                <TableCell
                                    padding="checkbox"
                                    sx={{
                                        backgroundColor: '#1E1E1E',
                                        borderWidth: 0,
                                    }}>
                                    <Checkbox
                                        // indeterminate={
                                        //     numSelected > 0 &&
                                        //     numSelected < rowCount
                                        // }
                                        checked={false}
                                        // onChange={onSelectAllClick}
                                        // inputProps={{
                                        //     'aria-label': 'select all desserts',
                                        // }}
                                    />
                                </TableCell>
                            ) : null}

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
                        {rows.map((row) => {
                            const isItemSelected = isSelected(row.id)
                            return (
                                <StyledTableRow
                                    key={row.id}
                                    sx={{
                                        '& td, & th': {
                                            borderBottom: 1,
                                            borderBottomColor: '#333333',
                                        },
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                    onClick={() => handleClick(row.id)}>
                                    {hasCheckbox ? (
                                        <TableCell
                                            padding="checkbox"
                                            sx={{
                                                backgroundColor: 'transparent',
                                                borderWidth: 0,
                                            }}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                        </TableCell>
                                    ) : null}
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
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {hasCheckbox ? (
                <div className="mt-4 flex justify-end">
                    <Button
                        type={'button'}
                        title={'Reset'}
                        onClick={() => {
                            setSelected([])
                            onSubmit && onSubmit(selected)
                        }}>
                        核銷
                    </Button>
                </div>
            ) : null}
        </>
    )
}

export default DataTable
