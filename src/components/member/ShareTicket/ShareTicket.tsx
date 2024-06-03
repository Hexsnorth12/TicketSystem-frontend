'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import fakeImage from '@images/groupcard1.png'
import { Button, Tag } from '@/components/common'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const router = useRouter()
    return (
        <div className="flex-wrap rounded-lg bg-gray-3 p-4 md:flex md:items-end md:justify-between md:gap-4 md:px-10 md:py-8">
            <div>
                <div className="mb-4 flex">
                    <Image
                        src={fakeImage}
                        alt="movie picture"
                        width={132}
                        height={80}
                        className="mr-4 rounded-lg"
                    />
                    <div className="flex grow flex-col justify-between text-white">
                        <h4 className="text-btn2">哥吉拉大戰金剛</h4>
                        <Tag
                            icon={FaMapMarkerAlt}
                            tagValue={'台北'}
                            iconColor={'gray-4 text-small2'}
                            position={'left'}
                        />
                        <p className="text-number5">2022-01-01</p>
                    </div>
                </div>
                <div className="mb-4 flex space-x-2 md:mb-0">
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
                    <div className="flex text-start">
                        <div className="space-x-1 bg-gray-4 px-3 py-1">
                            <span className="text-small2 tracking-wide text-white">
                                擁有張數
                            </span>
                            <span className="text-number5 leading-120 text-primary">
                                1
                            </span>
                            <span className="text-small2 tracking-wide text-white">
                                張
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-col space-y-3 md:m-0 md:flex-row md:space-y-0">
                <Button
                    type={'button'}
                    title={'退票'}
                    onClick={() => {
                        router.push('sharedTicket/publish/1')
                    }}
                    className="mr-3 w-full border-white py-2 text-btn2 text-white hover:border-primary hover:bg-gray-1 hover:text-primary md:w-auto md:py-3 md:text-btn1">
                    <span className="font-medium tracking-wider">上架分票</span>
                </Button>
                <Button
                    type={'button'}
                    title={'退票'}
                    onClick={() => {
                        router.push('/createCode/1')
                    }}
                    className="mr-3 w-full border-white py-2 text-btn2 font-medium text-white hover:border-primary hover:bg-gray-1 hover:text-primary md:w-auto md:py-3 md:text-btn1 ">
                    <span className="font-medium tracking-wider">
                        取得分票碼
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Page
