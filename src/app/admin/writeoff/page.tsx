'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { DataShell, DataTable, Button } from '@/components/common'
import { CheckHeadCell } from '@/definitions/dataTable'
import { useLazyGetTicketsQuery } from '@/services/modules/admin'
import { se } from 'date-fns/locale'

const PAGE_LIMIT = 10

interface Props {}

const Page: React.FC<Props> = () => {
    const { data: session } = useSession()
    const [processRows, setProcessRows] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const searchParams = useSearchParams()
    const ids = searchParams.get('ids') ?? ''

    const [getTickets] = useLazyGetTicketsQuery()

    useEffect(() => {
        setSearchValue(ids)
    }, [ids])

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
            data?.tickets.map((ticket: any) => {
                return {
                    id: ticket.orderId,
                    ticketId: ticket._id,
                    productName: ticket.product.title,
                    user: ticket.userId,
                    status: ticket.status,
                    writeOffDate: ticket.writeOffAt,
                    staffId: ticket.writeOffStaffId,
                }
            }) ?? []
        setProcessRows(processRows)
    }

    return (
        <section>
            <DataShell title={'票卷核銷'}>
                <div className="mb-6 flex items-center">
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
                    <DataTable headCells={CheckHeadCell} rows={processRows} />
                </div>
            </DataShell>
        </section>
    )
}

export default Page
