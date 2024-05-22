import React from 'react'
import Image from 'next/image'
import location from '@icon/location.svg'
import fakeImage from '@images/groupcard1.png'
import Button from '../Button/button'

interface MyTicketProps {}

const MyTicket: React.FC<MyTicketProps> = () => {
    return (
        <div className="rounded-lg bg-gray-3 p-4 md:px-10 md:py-8">
            <div className="md:mb-6 md:flex md:justify-between md:gap-10">
                <div className="mb-6 grow md:m-0">
                    <div className="mb-6 flex items-center md:mb-8">
                        <div className="mr-4 rounded-lg md:hidden">
                            <Image
                                src={fakeImage}
                                width={132}
                                height={80}
                                alt="ticket image"
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <h5 className="mb-2 text-btn2 font-medium text-white md:text-header5 md:leading-120">
                                比悲傷更悲傷的故事
                            </h5>
                            <div className="flex gap-1">
                                <Image
                                    src={location}
                                    width={16}
                                    height={16}
                                    className=""
                                    alt="location"
                                />
                                <p className="text-small2 text-white">
                                    美麗華大直影城
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* info */}
                    <div>
                        <div className="flex border-b border-gray-4 pb-2 md:pb-3">
                            <div className="grow space-x-2">
                                <span className="text-small2 text-gray-5">
                                    時間
                                </span>
                                <span className="text-number5 font-bold leading-120 text-white">
                                    Feb 24 19:30
                                </span>
                            </div>
                            <div className="grow space-x-2">
                                <span className="text-small2 text-gray-5">
                                    數量
                                </span>
                                <span className="text-number5 font-bold leading-120 text-white">
                                    2
                                </span>
                            </div>
                        </div>
                        <div className="flex pt-2 md:pt-3">
                            <div className="grow space-x-2">
                                <span className="text-small2 text-gray-5">
                                    訂單編號
                                </span>
                                <span className="text-number5 font-bold leading-120 text-white">
                                    1234567890
                                </span>
                            </div>
                            <div className="grow space-x-2">
                                <span className="text-small2 text-gray-5">
                                    金額
                                </span>
                                <span className="text-number5 font-bold leading-120 text-white">
                                    1020
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden rounded-lg md:block">
                    <Image
                        src={fakeImage}
                        width={267}
                        height={160}
                        alt="ticket image"
                        className="rounded-lg"
                    />
                </div>
            </div>

            {/* time tag */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex text-start">
                    <div className="space-x-1 bg-gray-4 px-3 py-1">
                        <span className="text-number5 leading-120 text-primary">
                            1
                        </span>
                        <span className="text-small2 tracking-wide text-white">
                            日後到期
                        </span>
                    </div>
                </div>

                {/* button */}
                <div className="mt-6 flex md:m-0">
                    <Button
                        type={'button'}
                        title={'退票'}
                        onClick={() => {}}
                        className="mr-3 w-full bg-gray-1 py-2 text-primary hover:text-white md:w-auto md:py-3 md:text-btn1">
                        <span className="font-medium tracking-wider">退票</span>
                    </Button>
                    <Button
                        type={'button'}
                        title={'詳細'}
                        onClick={() => {}}
                        className="w-full py-2 md:w-auto md:py-3">
                        <span className="font-medium tracking-wider">詳細</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default MyTicket
