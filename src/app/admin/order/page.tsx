'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DataShell, DataTable, Button } from '@/components/common'
import { OrderHeadCell } from '@/definitions/dataTable'
import { SelectInput } from '@/components/common'
import { DATA_OPTIONS } from '@/definitions/dataTable'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'
import { startOfToday, parseISO, format } from 'date-fns'
import { useLazyGetOrdersQuery } from '@/services/modules/admin'

const CustomizeDatePickerInput = styled(DatePicker)`
    .MuiInputBase-input {
        color: #fff;
        font-weight: normal;
        align-self: center;
        padding: 16px 0px 16px 16px;
        outline: none;
        bordercolor: #fff;
    }

    .MuiSvgIcon-root {
        color: #fff;
    }
    .MuiInputLabel-root {
        color: #fff;
    }
`

const PAGE_LIMIT = 50

interface Props {}

interface ProcessRow {
    id: string
    [key: string]: string | number
}

const Page: React.FC<Props> = () => {
    const { data: session } = useSession()

    const [startDate, setStartDate] = useState<Date | null>(startOfToday())
    const [endDate, setEndDate] = useState<Date | null>(startOfToday())
    const [status, setStatus] = useState<string>('')
    const [processRows, setProcessRows] = useState<ProcessRow[]>([])

    const [getOrders] = useLazyGetOrdersQuery()

    useEffect(() => {
        const getDate = async () => {
            const params = new URLSearchParams({
                page: '1',
                limit: `${PAGE_LIMIT}`,
            })
            const data = await getOrders({
                params: params.toString(),
                token: session?.accessToken as string,
            }).unwrap()
            const processRows =
                data?.orders.map((order) => {
                    return {
                        id: order._id,
                        thirdPartyPaymentId: order.thirdPartyPaymentId,
                        account: order.user.account,
                        paymentMethod: order.paymentMethod,
                        price: order.price,
                        createdAt: format(
                            parseISO(order.createdAt),
                            'yyyy-MM-dd',
                        ),
                        updatedAt: format(parseISO(order.paidAt), 'yyyy-MM-dd'),
                    }
                }) ?? []
            setProcessRows(processRows)
        }
        getDate()
    }, [])

    const handleSearch = async () => {
        const params = new URLSearchParams({
            page: '1',
            limit: `${PAGE_LIMIT}`,
        })
        if (status) {
            params.append('status', status)
        }
        if (startDate) {
            params.append('createdAtFrom', format(startDate, 'yyyy-MM-dd'))
        }
        if (endDate) {
            params.append('createdAtTo', format(endDate, 'yyyy-MM-dd'))
        }
        const data = await getOrders({
            params: params.toString(),
            token: session?.accessToken as string,
        }).unwrap()
        const processRows =
            data?.orders.map((order) => {
                return {
                    id: order._id,
                    thirdPartyPaymentId: order.thirdPartyPaymentId,
                    account: order.user.account,
                    paymentMethod: order.paymentMethod,
                    price: order.price,
                    createdAt: format(parseISO(order.createdAt), 'yyyy-MM-dd'),
                    updatedAt: format(parseISO(order.paidAt), 'yyyy-MM-dd'),
                }
            }) ?? []
        setProcessRows(processRows)
    }

    return (
        <section>
            <DataShell title={'訂單列表'}>
                <div className="mb-6 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-start md:gap-0">
                    <div className="w-full md:w-auto md:min-w-[20%]">
                        <SelectInput
                            placeholder="訂單狀態"
                            options={DATA_OPTIONS.OrderStatus}
                            label={'訂單狀態'}
                            onSelectChange={(status) => setStatus(status)}
                        />
                    </div>
                    <div className="mx-3 w-full md:w-auto">
                        <CustomizeDatePickerInput
                            label="訂單成立時間 - 起"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div className="mx-3 w-full md:w-auto">
                        <CustomizeDatePickerInput
                            label="訂單成立時間 - 迄"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <Button
                        type={'button'}
                        title={'Reset'}
                        onClick={handleSearch}>
                        搜尋
                    </Button>
                </div>
                <div>
                    <DataTable headCells={OrderHeadCell} rows={processRows} />
                </div>
            </DataShell>
        </section>
    )
}

export default Page
