import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { bellota } from '@/components/fonts'
import fakeImage from '@images/groupcard4.jpg'
import accountIcon from '@icon/account_gray.svg'
import location from '@icon/location.svg'

import { parseISO, format } from 'date-fns'

type Group = {
    _id: string
    title: string
    movieTitle: string
    amount: number
    placeholderImg: string
    theater: string
    hasTicket: boolean
    time: string
    endAt: string
    startAt: string
    vacancy: number
    status: string
    content: string
    participantCount: number
}

interface JoinCardProps {
    group: Group
}

const JoinCard: React.FC<JoinCardProps> = ({ group }) => {
    return (
        <div className="flex flex-col rounded-lg">
            <div className="h-[216px] w-[129px] md:h-[173px] md:w-[288px]">
                <Image
                    src={group.placeholderImg}
                    alt="Join Card"
                    width={216}
                    height={129}
                    className="h-full w-full rounded-t-lg object-cover"
                />
            </div>
            <div className="grow rounded-b-lg bg-gray-2 px-3 pb-2 pt-3 md:pb-3 md:pt-4">
                <p className="mb-2 overflow-hidden text-ellipsis text-nowrap text-btn2 text-white md:text-header5">
                    {group.movieTitle}
                </p>
                <p className="mb-2 grow text-small1 text-gray-5 md:mb-3 md:text-small2">
                    {group.content}
                </p>
                <div className="item-center mb-3 flex justify-between md:mb-4">
                    <p
                        className={clsx(
                            'text-number5 text-primary',
                            bellota.className,
                        )}>
                        {format(parseISO(group.time), 'yyyy.MM.dd HH:mm')}
                    </p>
                    <div
                        className={clsx(
                            'item-center hidden space-x-1 md:flex',
                            bellota.className,
                        )}>
                        <Image
                            src={accountIcon}
                            alt="account"
                            width={16}
                            height={16}
                        />
                        <span className="text-number5 text-primary">
                            {group?.participantCount ?? 1}
                        </span>
                        <span className="text-number5 text-gray-5">/</span>
                        <span className="text-number5 text-gray-5">
                            {group.amount}
                        </span>
                    </div>
                </div>
                <div className="item-center flex space-x-3 border-t border-gray-3 pt-2 md:pt-3">
                    <p className="rounded-lg bg-gray-1 px-3 py-1 text-small2 text-white">
                        {group.vacancy}
                    </p>
                    <div className="flex items-center gap-1">
                        <Image
                            src={location}
                            width={16}
                            height={16}
                            className=""
                            alt="location"
                        />
                        <p className="text-small2 text-white">
                            {group.theater}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinCard
