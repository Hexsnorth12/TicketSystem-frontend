'use client'

import React from 'react'
import { MyTicket } from '@/components/common'

interface TicketGroupProps {}

const TicketGroup: React.FC<TicketGroupProps> = () => {
    return (
        <div className="overflow-y-scroll scrollbar-hidden md:h-[600px] md:gap-10 md:pr-10 md:scrollbar md:scrollbar-block">
            <div className="flex flex-col gap-[18px]">
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
