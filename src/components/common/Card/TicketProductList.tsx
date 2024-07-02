// /components/ProductList.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { truncateName } from '@/utils/numberUtils'
import { formatdate } from '@/utils/dateUtils'
import Chatbtn from '../../Buttons/ChatBtn'
import { bellota } from '@/components/fonts'

type Ticket = {
    _id: string
    productId: string
    userId: string
    orderId: string
    expiredAt: string
    writeOffAt: string
    writeOffStaffId: string
    giverId: string
    hasTicket: boolean
    product: {
        _id: string
        title: string
        theater: string
        price: number
        startAt: string
        recommendWeight: number
        isPublic: boolean
        photoPath: string
    }
    shareCode: string
    count: number
}

type TicketProductListProps = {
    tickets: Ticket[]
}

const TicketProductList: React.FC<TicketProductListProps> = ({ tickets }) => {
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="mt-[80px] hidden md:grid md:grid-cols-4 md:gap-4">
                {tickets.map((ticket, index) => (
                    <div
                        key={ticket._id}
                        className="relative m-4 rounded-lg  bg-gray-3 shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] hover:shadow-primary md:pb-3 md:pt-[80px] lg:pb-6 lg:pt-[104px]">
                        <div className=" flex flex-col items-center">
                            <div className="absolute md:-top-[60px] md:h-[120px] md:w-[120px] lg:-top-[80px] lg:h-[160px] lg:w-[160px]">
                                <Image
                                    src={ticket.product.photoPath}
                                    alt={ticket.product.title}
                                    width={160}
                                    height={160}
                                    objectFit="cover"
                                    className="h-full w-full rounded-full border-4 border-gray-4 object-cover"
                                />
                            </div>
                            <div className="mb-3 grow text-center">
                                <div className="text-header5 font-medium text-white">
                                    {ticket.product.title}
                                </div>
                                <div className="flex flex-col items-center pb-3 pt-4 text-small2">
                                    <div className="mb-4 rounded-md bg-gray-4 px-3 py-1 text-white">
                                        剩餘
                                        <span
                                            className={clsx(
                                                'text-number5 text-primary',
                                                bellota.className,
                                            )}>
                                            {`  ${ticket.count}  `}
                                        </span>
                                        張
                                    </div>
                                    <p className={bellota.className}>
                                        <span className="text-number5 text-gray-5">
                                            NT$
                                        </span>
                                        <span className="px-2 text-number4 text-primary">
                                            {ticket.product.price}
                                        </span>
                                    </p>
                                </div>
                                <p className=" text-gray-5">
                                    <span className="md:mb-1 md:block lg:inline">
                                        時效性
                                    </span>
                                    <span
                                        className={clsx(
                                            'px-2 text-number5 text-white md:block lg:inline',
                                            bellota.className,
                                        )}>
                                        {formatdate(ticket.expiredAt)}
                                    </span>
                                </p>
                            </div>
                            <Chatbtn
                                ticketId={ticket._id}
                                index={index}
                                name={ticket.product.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile-Navbar */}
            <div className="flex overflow-x-scroll whitespace-nowrap md:hidden">
                {tickets.map((ticket, index) => (
                    <div
                        key={ticket._id}
                        className="m-4 flex flex-col items-center rounded-lg shadow-md">
                        <Link href="">
                            <div className="relative h-[160px] w-[160px]">
                                <Image
                                    src={ticket.product.photoPath}
                                    alt={ticket.product.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg border-2 border-white border-opacity-0 transition-opacity duration-300 md:border-opacity-100"
                                />
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="mt-2 text-center">
                            <div className="text-headline5 font-medium text-white">
                                {truncateName(ticket.product.title)}
                            </div>
                            <div className="text-small2">
                                <div className="flex items-center justify-center text-gray-5">
                                    剩餘
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        {ticket.count}{' '}
                                    </nav>
                                    張
                                </div>
                                <div className="flex items-center justify-center text-gray-5">
                                    NT$
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        {ticket.product.price}{' '}
                                    </nav>
                                </div>
                            </div>
                            <div className="flex items-center justify-center text-gray-5">
                                時效性
                                <nav className="px-2 text-number5 text-white">
                                    {formatdate(ticket.expiredAt)}
                                </nav>
                            </div>
                        </div>
                        <Chatbtn
                            ticketId={ticket._id}
                            index={index}
                            name={ticket.product.title}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default TicketProductList
