import React from 'react'
import { TicketBoard, TicketInfo } from '@/components/ticket'
import fetchServer from '@/lib/fetchServer'
import { TicketDetail } from '@/types'

interface PageProps {
    params: { id: string }
}

const Page: React.FC<PageProps> = async ({ params }) => {

    const { data }: { data: TicketDetail } = await fetchServer({
        method: 'GET',
        url: `api/v1/ticket/${params.id}`,
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
