'use client'
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Counter from '../Counter/Counter'
import Image from 'next/image'
import Button from '@components/common/Button'
import { MdDelete } from 'react-icons/md'
import { CartItem } from '@/types/product'
import { useCartStore } from '@/stores/useCartStore'
interface Column {
    title: string
    dataIndex: keyof DataSource
    key: string
}

interface DataSource {
    key: string
    name: {
        image: string
        title: string
        subtitle: string
    }
    number: number
    price: number
}

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
    const [numberStates, setNumberStates] = useState<{ [key: string]: number }>(
        {},
    )
    const cart = useCartStore((state) => state.cart)
    const removeAllFromCart = useCartStore((state) => state.removeAllFromCart)
    const updateCartItemQuantity = useCartStore(
        (state) => state.updateCartItemQuantity,
    )
    console.log(numberStates.number, 'numberStates')

    const handleNumberChange = (uniqueKey: string, newValue: number) => {
        setNumberStates((prevState) => ({
            ...prevState,
            [uniqueKey]: newValue,
        }))
        const [id, name] = uniqueKey.split('-')
        const itemToAdd = cart.find(
            (item) => item._id === id && item.selectedPlan.name === name,
        )
        if (itemToAdd) {
            updateCartItemQuantity(id, name, newValue)
        }
    }
    const handleRemove = (data: DataSource) => {
        const itemToRemove = cart.find(
            (item) =>
                item._id === data.key &&
                item.selectedPlan.name === data.name.subtitle,
        )
        if (itemToRemove) {
            removeAllFromCart(itemToRemove, itemToRemove.selectedPlan)
        }
    }
    const renderPrice = (data: DataSource) => {
        const uniqueKey = `${data.key}-${data.name.subtitle}`
        const currentNumber = numberStates[uniqueKey] ?? data.number

        if (
            typeof currentNumber !== 'number' ||
            typeof data.price !== 'number'
        ) {
            return 'Invalid Data'
        }

        return `${currentNumber * data.price} NT`
    }
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
    return (
        <TableContainer>
            <Table
                className="min-w-[
                     md:w-full"
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <StyledTableCell key={column.key}>
                                {column.title}
                            </StyledTableCell>
                        ))}
                        {/* 添加删除按钮列 */}
                        <StyledTableCell>動作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSource.map((data) => (
                        <TableRow key={data.key}>
                            {columns.map((column) => {
                                const uniqueKey = `${data.key}-${data.name.subtitle}`
                                const cellData =
                                    data[column.dataIndex as keyof DataSource]
                                return (
                                    <StyledTableCell key={column.key}>
                                        {column.dataIndex === 'number' ? (
                                            <Counter
                                                onValueChange={(newValue) =>
                                                    handleNumberChange(
                                                        uniqueKey,
                                                        newValue,
                                                    )
                                                }
                                                initialValue={
                                                    numberStates[uniqueKey] ||
                                                    data.number
                                                }
                                                minValue={1}
                                                maxValue={999}
                                            />
                                        ) : column.dataIndex === 'price' ? (
                                            renderPrice(data)
                                        ) : typeof cellData === 'object' &&
                                          'image' in cellData &&
                                          'title' in cellData &&
                                          'subtitle' in cellData ? (
                                            renderName(cellData)
                                        ) : (
                                            cellData
                                        )}
                                    </StyledTableCell>
                                )
                            })}
                            {/* 添加删除按钮 */}
                            <StyledTableCell>
                                <Button
                                    onClick={() => handleRemove(data)}
                                    type="button"
                                    title=""
                                    className="border-0">
                                    <MdDelete />
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent
