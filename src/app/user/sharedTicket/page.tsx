'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

import { ShareTicket } from '@/components/member'
import { TicketCodeForm } from '@/components/forms'
import BasicTabs from '@/components/common/Tab/movieDetail'
import { useLazyGetShareTicketsQuery } from '@/services/modules/user'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const { data: session } = useSession()
    const [getShareTickets, { data }] = useLazyGetShareTicketsQuery()
    const [isPublished, setIsPublished] = useState<boolean>(false)

    // const { data }: { data: ShareOrder[] } = await fetchServer({
    //     method: 'GET',
    //     url: `api/v1/user/share-tickets?isPublished=false`,
    // })

    useEffect(() => {
        getShareTickets({
            token: session?.accessToken ?? '',
            isPublished: false,
        }).unwrap()
    }, [])

    const renderShareTickets = data?.map((order) => (
        <ShareTicket
            key={order.orderId + order.productId}
            order={order}
            isPublished={isPublished}
        />
    ))

    const handleTabsChange = (index: number) => {
        if (index === 0) {
            getShareTickets({
                token: session?.accessToken ?? '',
                isPublished: false,
            }).unwrap()
            setIsPublished(false)
        } else if (index === 1) {
            getShareTickets({
                token: session?.accessToken ?? '',
                isPublished: true,
            }).unwrap()
            setIsPublished(true)
        }
    }

    const tabs = [
        {
            label: '可分票',
            Component: (
                <div
                    className={clsx(
                        'mt-4 md:mt-10',
                        'after:pointer-events-none md:relative md:after:absolute md:after:bottom-0 md:after:z-10 md:after:h-[80px] md:after:w-full md:after:shadow-[inset_0_-35px_30px_-15px_rgba(0,0,0,0.5)] md:after:shadow-gray-1',
                    )}>
                    <div className="overflow-y-scroll scrollbar-hidden md:h-[600px] md:gap-10 md:pr-10 md:scrollbar md:scrollbar-block">
                        <div className="flex flex-col gap-[18px]">
                            {renderShareTickets}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            label: '已上架',
            Component: (
                <div
                    className={clsx(
                        'mt-4 md:mt-10',
                        'after:pointer-events-none md:relative md:after:absolute md:after:bottom-0 md:after:z-10 md:after:h-[80px] md:after:w-full md:after:shadow-[inset_0_-35px_30px_-15px_rgba(0,0,0,0.5)] md:after:shadow-gray-1',
                    )}>
                    <div className="overflow-y-scroll scrollbar-hidden md:h-[600px] md:gap-10 md:pr-10 md:scrollbar md:scrollbar-block">
                        <div className="flex flex-col gap-[18px]">
                            {renderShareTickets}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            label: '取得票券',
            Component: <TicketCodeForm />,
        },
    ]
    return (
        <div className=" py-6 md:py-0">
            <div className="flex gap-2">
                <BasicTabs tabs={tabs} handleTabsChange={handleTabsChange} />
            </div>
        </div>
    )
}

export default Page
