'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { DataShell, DataTable, Button } from '@/components/common'
import { CheckHeadCell } from '@/definitions/dataTable'
import {
    useLazyGetTicketsQuery,
    useVerifyTicketMutation,
} from '@/services/modules/admin'
import LoadingSkeleton from '@/components/LoadingSkeleton/Loading'
import { useAlert } from '@/components/useAlert/useAlert'
const PAGE_LIMIT = 10

interface Props {}

interface ProcessRow {
    id: string
    [key: string]: string | number
}

const Page: React.FC<Props> = () => {
    const { data: session } = useSession()
    const [processRows, setProcessRows] = useState<ProcessRow[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const searchParams = useSearchParams()
    const ids = searchParams.get('ids') ?? ''
    const showAlert = useAlert()
    const [getTickets, { data: ticketList, isLoading: isGetTicketing }] =
        useLazyGetTicketsQuery()
    const [verifyTicket, { isSuccess, isLoading }] = useVerifyTicketMutation()

    useEffect(() => {
        setSearchValue(ids)
    }, [ids])

    useEffect(() => {
        if (!isLoading && isSuccess) {
            handleSearch()
        }
    }, [isSuccess, isLoading])

    const handleSearch = async () => {
        const params = new URLSearchParams({
            page: '1',
            limit: `${PAGE_LIMIT}`,
            ids: searchValue,
        })
        const data = await getTickets({
            params: params.toString(),
            token: session?.accessToken as string,
        }).unwrap()
        const processRows =
            data?.tickets.map((ticket) => {
                return {
                    orderId: ticket.orderId,
                    id: ticket._id,
                    productName: ticket.product.title,
                    user: ticket.userId,
                    status: ticket.status,
                    writeOffDate: ticket.writeOffAt,
                    staffId: ticket.writeOffStaffId,
                }
            }) ?? []
        setProcessRows(processRows)
    }

    const handleSubmit = async (ids: string[]) => {
        const idSet = new Set(ids)
        const tickets = ticketList!.tickets
            .filter((ticket) => idSet.has(ticket._id))
            .map((ticket) => ({
                productId: ticket.productId,
                userId: ticket.userId,
                ticketId: ticket._id,
            }))
        if (tickets.length === 0) {
            // 检查 tickets 数组是否为空
            showAlert('請選擇票券', 'warning')
            return
        }
        try {
            await verifyTicket({
                payload: { tickets },
                token: session?.accessToken as string,
            })
            showAlert('核銷成功', 'success')
        } catch (error) {
            showAlert('核銷失敗', 'error')
        }
    }

    return (
        <section>
            {(isLoading || isGetTicketing) && (
                <div className="absolute left-[50%] top-0 z-30 -translate-x-1/2">
                    <LoadingSkeleton />
                </div>
            )}
            <DataShell title={'票券核銷'}>
                <div className="mb-6 flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0">
                    <input
                        type="text"
                        className="grow rounded-lg border border-gray-3 bg-transparent px-2.5 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        className="ml-6"
                        type={'button'}
                        title={'Reset'}
                        onClick={handleSearch}>
                        搜尋
                    </Button>
                </div>
                <div>
                    <DataTable
                        headCells={CheckHeadCell}
                        rows={processRows}
                        hasCheckbox={true}
                        onSubmit={handleSubmit}
                    />
                </div>
            </DataShell>
        </section>
    )
}

export default Page
