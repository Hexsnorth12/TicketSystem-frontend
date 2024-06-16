import React from 'react'
import { ButtonGroup, TicketGroup } from '@/components/layout'
import clsx from 'clsx'
import { Ticket } from '@/types'
import fetchClient from '@/lib/fetchClient'

interface pageProps {
    searchParams?: { [key: string]: string }
}

const PAGE_LIMIT = 10

const Page: React.FC<pageProps> = async ({ searchParams }) => {
    const status = searchParams?.status ?? 'unverified'
    const {
        data: { tickets },
    }: { data: { tickets: Ticket[]; page: number; totalCount: number } } =
        await fetchClient({
            method: 'GET',
            url: `api/v1/ticket?page=1&limit=${PAGE_LIMIT}&status=${status}`,
        })

    return (
        <div className=" py-6 md:py-0 md:pl-[60px]">
            <div className="flex gap-2">
                <ButtonGroup />
            </div>
            <div
                className={clsx(
                    'mt-4 md:mt-10',
                    'md:relative md:after:absolute md:after:bottom-0 md:after:z-10 md:after:h-[80px] md:after:w-full md:after:shadow-[inset_0_-35px_30px_-15px_rgba(0,0,0,0.5)] md:after:shadow-gray-1',
                )}>
                <TicketGroup tickets={tickets} pageLimit={PAGE_LIMIT} />
            </div>
        </div>
    )
}

export default Page
