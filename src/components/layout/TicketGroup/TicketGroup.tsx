'use client'

import React, { useState, useRef, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import { useSearchParams } from 'next/navigation'
import { MyTicket, EmptyData } from '@/components/common'
import { Ticket } from '@/types'
import useScrollFetch from '@/hooks/useScrollFetch'

interface TicketGroupProps {
    tickets: Ticket[]
    pageLimit: number
}

const TicketGroup: React.FC<TicketGroupProps> = ({ tickets, pageLimit }) => {
    const searchParams = useSearchParams()
    const status = searchParams.get('status') || 'unverified'

    const [currentPage, setCurrentPage] = useState(1)

    const { loading, dataList, hasMore } = useScrollFetch(
        tickets,
        pageLimit,
        currentPage,
        'tickets',
        status,
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
        return (
            <div className="md:h-[600px]">
                <EmptyData message="尚無評論" hasButton={false} />
            </div>
        )
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
                    outerRef={lastPostRef}>
                    {({ index }) => {
                        if (dataList.length === index + 1) {
                            return (
                                <div ref={lastPostRef}>
                                    <MyTicket ticket={dataList[index]} />
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <MyTicket ticket={dataList[index]} />
                                </div>
                            )
                        }
                    }}
                </List>
            </div>
        </div>
    )
}

export default TicketGroup
