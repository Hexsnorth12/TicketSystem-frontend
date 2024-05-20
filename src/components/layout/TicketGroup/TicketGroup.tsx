'use client'

import React from 'react'
import { MyTicket } from '@/components/common'

interface TicketGroupProps {}

const TicketGroup: React.FC<TicketGroupProps> = () => {
    return (
        <div className="max-h-screen overflow-y-scroll scrollbar-hidden md:pr-10 md:scrollbar md:scrollbar-block">
            <div className="flex flex-col gap-[18px] md:gap-10">
                <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket />
            </div>
        </div>
    )
}

export default TicketGroup
