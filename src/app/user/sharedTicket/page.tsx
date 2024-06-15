import React from 'react'
import { ShareTicket } from '@/components/member'
import { favorites } from '@/definitions/movieData'
import { TicketCodeForm } from '@/components/forms'
import BasicTabs from '@/components/common/Tab/movieDetail'
import clsx from 'clsx'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const renderShareTickets = favorites.map((movie) => (
        <ShareTicket key={movie.id} />
    ))
    const tabs = [
        {
            label: '電影介紹',
            Component: (
                <div
                    className={clsx(
                        'mt-4 md:mt-10',
                        'md:relative md:after:absolute md:after:bottom-0 md:after:z-10 md:after:h-[80px] md:after:w-full md:after:shadow-[inset_0_-35px_30px_-15px_rgba(0,0,0,0.5)] md:after:shadow-gray-1',
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
            label: '評價',
            Component: <TicketCodeForm />,
        },
    ]
    return (
        <div className=" py-6 md:py-0">
            <div className="flex gap-2">
                <BasicTabs tabs={tabs} />
            </div>
        </div>
    )
}

export default Page
