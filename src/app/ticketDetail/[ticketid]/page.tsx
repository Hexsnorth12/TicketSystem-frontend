import React from 'react'
import { TicketBoard, TicketInfo } from '@/components/ticket'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <>
            <div className="md:w-4/12 md:pr-10">
                <TicketInfo />
            </div>
            <div className="md:w-8/12">
                <TicketBoard />
            </div>
        </>
    )
}

export default Page
