import React from 'react'
import { TicketBoard, TicketInfo } from '@/components/ticket'
import fetchClient from '@/lib/fetchClient'
import { TicketDetail } from '@/types'

interface PageProps {
    params: { ticketId: string }
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const data: TicketDetail = await fetchClient({
        method: 'GET',
        url: `api/v1/ticket/${params.ticketId}`,
    })
    return (
        <>
            <div className="md:w-4/12 md:pr-10">
                <TicketInfo ticketDetail={data} />
            </div>
            <div className="md:w-8/12">
                <TicketBoard ticketDetail={data} />
            </div>
        </>
    )
}

export default Page
