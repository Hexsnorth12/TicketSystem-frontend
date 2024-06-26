'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DataShell, DataTable, Button } from '@/components/common'
import { OrderHeadCell } from '@/definitions/dataTable'
import { SelectInput } from '@/components/common'
import { DATA_OPTIONS } from '@/definitions/dataTable'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'
import { parseISO, format, startOfMonth, endOfMonth } from 'date-fns'
import { useLazyGetOrdersQuery } from '@/services/modules/admin'
import LoadingSkeleton from '@/components/LoadingSkeleton/Loading'

const CustomizeDatePickerInput = styled(DatePicker)`
    .MuiInputBase-root {
        box-shadow: var(--tw-ring-inset) 0 0 0
            calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        --tw-ring-color: rgb(51 51 51);
    }

    .MuiInputBase-input {
        color: #fff;
        font-weight: normal;
        align-self: center;
        padding: 14px 0px 14px 0px;
        outline: none;
    }

    .MuiSvgIcon-root {
        color: #4e4e4e;
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

    const [startDate, setStartDate] = useState<Date | null>(
        startOfMonth(new Date()),
    )
    const [endDate, setEndDate] = useState<Date | null>(endOfMonth(new Date()))
    const [status, setStatus] = useState<string>('')
    const [processRows, setProcessRows] = useState<ProcessRow[]>([])

    const [getOrders, { isLoading }] = useLazyGetOrdersQuery()

    useEffect(() => {
        const getDate = async () => {
            const params = new URLSearchParams({
                page: '1',
                limit: `${PAGE_LIMIT}`,
                createdAtFrom: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                createdAtTo: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
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
                        ...(order.paidAt && order.paidAt?.length > 0
                            ? {
                                  updatedAt: format(
                                      parseISO(order.paidAt),
                                      'yyyy-MM-dd',
                                  ),
                              }
                            : { updatedAt: '尚未付款' }),
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
                    ...(order.paidAt && order.paidAt?.length > 0
                        ? {
                              updatedAt: format(
                                  parseISO(order.paidAt),
                                  'yyyy-MM-dd',
                              ),
                          }
                        : { updatedAt: '尚未付款' }),
                }
            }) ?? []
        setProcessRows(processRows)
    }

    return (
        <section className="relative">
            {isLoading && (
                <div className="absolute top-0">
                    <LoadingSkeleton />
                </div>
            )}

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
                            slotProps={{
                                inputAdornment: {
                                    position: 'start',
                                },
                            }}
                        />
                    </div>
                    <div className="mx-3 w-full md:w-auto">
                        <CustomizeDatePickerInput
                            label="訂單成立時間 - 迄"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            slotProps={{
                                inputAdornment: {
                                    position: 'start',
                                },
                            }}
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
