// /components/ProductList.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName } from '@/utils/numberUtils'
import Chatbtn from '../../Buttons/ChatBtn'

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
}

type TicketProductListProps = {
    tickets: Ticket[]
}

const TicketProductList: React.FC<TicketProductListProps> = ({ tickets }) => {
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:px-32">
                {tickets.map((ticket) => (
                    <div
                        key={ticket._id}
                        className="h-2-3-bottom m-4 flex flex-col items-center justify-end rounded-lg  bg-gray-3 shadow-md">
                        <div className="relative flex w-full flex-col items-center">
                            <Link href="">
                                <div className="relative h-[160px] w-[160px]">
                                    <Image
                                        src={ticket.product.photoPath}
                                        alt={ticket.product.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full border-4 border-gray-4 border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                    />
                                    {/* Border-primary with blur effect */}
                                    <div className=" absolute inset-0 rounded-full border-4 border-primary border-opacity-0 mix-blend-normal blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                                </div>
                            </Link>
                            <div className="mt-2 text-center">
                                <div className="text-headline5 font-medium text-white">
                                    {truncateName(ticket.product.title)}
                                </div>
                                <div className="text-small2">
                                    <div className="flex items-center justify-center text-gray-5">
                                        狀態
                                        <nav className="px-2 text-number4 text-primary">
                                            {' '}
                                            {
                                                ticket.product.recommendWeight
                                            }{' '}
                                        </nav>
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
                                        {' '}
                                        {ticket.expiredAt}{' '}
                                    </nav>
                                </div>
                            </div>
                            <Chatbtn />
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile-Navbar */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {tickets.map((ticket) => (
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
                                    className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
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
                                    劇院
                                    <nav className="px-2 text-number4 text-primary">
                                        {' '}
                                        {ticket.product.recommendWeight}{' '}
                                    </nav>
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
                                    {' '}
                                    {ticket.expiredAt}{' '}
                                </nav>
                            </div>
                        </div>

                        <Chatbtn />
                    </div>
                ))}
            </div>
        </>
    )
}

export default TicketProductList
