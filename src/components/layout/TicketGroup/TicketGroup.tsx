'use client'

import React, { useState, useRef, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import { MyTicket, EmptyData } from '@/components/common'
import { Ticket } from '@/types'
import useScrollFetch from '@/hooks/useScrollFetch'

interface TicketGroupProps {
    tickets: Ticket[]
    pageLimit: number
}

const TicketGroup: React.FC<TicketGroupProps> = ({ tickets, pageLimit }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const { loading, error, dataList, hasMore } = useScrollFetch(
        tickets,
        10,
        currentPage,
        'tickets',
    )
    const observer = useRef<IntersectionObserver>()
    const lastPostRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) {
                return
            }
            if (observer.current) {
                observer.current.disconnect()
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prev) => prev + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore],
    )

    if (dataList.length === 0) {
        return <EmptyData message="尚無評論" hasButton={false} />
    }

    return (
        <div className="overflow-y-scroll scrollbar-hidden md:h-[600px] md:gap-10 md:pr-10 md:scrollbar md:scrollbar-block">
            <div className="flex flex-col gap-[18px]">
                <List
                    height={600}
                    itemCount={dataList.length}
                    itemSize={300}
                    width="100%"
                    itemData={dataList}
                    outerRef={lastPostRef}
                    itemKey={(data: Ticket) => data._id}>
                    {({ index }) => {
                        if (dataList.length === index + 1) {
                            return (
                                <div ref={lastPostRef}>
                                    <MyTicket />
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <MyTicket />
                                </div>
                            )
                        }
                    }}
                </List>
                {/* <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket />
                <MyTicket /> */}
            </div>
        </div>
    )
}

export default TicketGroup
