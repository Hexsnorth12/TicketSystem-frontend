'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { Button, Counter } from '@/components/common'
import TextField from '@/components/ticket/TextField/TextField'
import { bellota } from '@/components/fonts'
import { TicketDetail } from '@/types'

interface TicketBoardProps {
    ticketDetail: TicketDetail
}

const TicketBoard: React.FC<TicketBoardProps> = ({ ticketDetail }) => {
    const [ticketAmount, setTicketAmount] = useState(0)

    const handleUpdateCounter = (amount: number) => {
        setTicketAmount(amount)
    }

    const handleGetCode = () => {
        console.log(ticketAmount)
    }
    return (
        <div className="rounded-lg border border-gray-3 px-4 py-6 md:px-[60px] md:py-10">
            {/* <div className="mb-4 flex space-x-3 md:justify-end">
                <Button
                    type="button"
                    title="驗票教學"
                    onClick={() => {}}
                    className="border-0 bg-gray-3 px-4 py-2 text-btn2 font-medium leading-150 text-white md:px-5 md:py-3 md:text-btn1">
                    驗票教學
                </Button>
                <Button
                    type="button"
                    title="驗票教學"
                    onClick={() => {}}
                    className="border-0 bg-gray-3 px-4 py-2 text-btn2 font-medium leading-150 text-white md:px-5 md:py-3 md:text-btn1">
                    分票教學
                </Button>
            </div> */}
            <TextField label={'地點'} containerStyle="border-b border-gray-3">
                <p className="flex ">
                    <span className="text-small2 leading-150 text-white md:text-small1">
                        {ticketDetail.theater}
                    </span>
                </p>
            </TextField>
            {/* <TextField label={'加購'} containerStyle="border-b border-gray-3">
                <p className="flex ">
                    <span className="text-small2 leading-150 text-white md:text-small1">
                        演員見面會週邊及電影全幅海報
                    </span>
                </p>
            </TextField> */}
            <TextField
                label={'持有數量'}
                containerStyle="border-b border-gray-3">
                <p className="flex ">
                    <span
                        className={clsx(
                            'text-number5 leading-150 text-white md:text-number4',
                            bellota.className,
                        )}>
                        1
                    </span>
                </p>
            </TextField>
            {ticketDetail.status === 'unverified' ? (
                <TextField
                    label={'現場換/驗票'}
                    containerStyle="md:border-b md:border-gray-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <span className="text-small2 leading-150 text-white md:text-small1">
                            選擇數量
                        </span>
                        <Counter
                            onValueChange={handleUpdateCounter}
                            minValue={1}
                            maxValue={1}
                        />
                        <Button
                            type="button"
                            title="驗票教學"
                            onClick={handleGetCode}
                            className=" w-full border-0 bg-gray-1 px-4 py-2 text-btn2 font-medium leading-150 text-primary md:w-auto md:px-5 md:py-3 md:text-btn2">
                            取得驗證碼
                        </Button>
                    </div>
                </TextField>
            ) : null}
            <div className="">
                <p className="mb-3 text-small2 leading-150 text-gray-5 md:text-small1">
                    線上分票
                </p>
                <Button
                    type="button"
                    title="驗票教學"
                    onClick={() => {}}
                    className="w-full bg-gray-3 bg-transparent px-4 py-2 text-btn2 font-medium leading-150 text-white md:w-auto md:px-5 md:py-3 md:text-btn2">
                    去分票
                </Button>
            </div>
        </div>
    )
}

export default TicketBoard
