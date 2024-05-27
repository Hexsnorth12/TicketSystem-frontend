import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import fackImg from '@images/groupcard1.png'
import { bellota } from '@/components/fonts'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <div className="rounded-lg bg-gray-3 p-4 md:p-6">
            <div className="mb-4 flex flex-col gap-4 md:gap-6">
                <div className="rounded-lg md:h-[198px]">
                    <Image
                        src={fackImg}
                        height={80}
                        width={132}
                        alt="ticket picture"
                        className="rounded-lg object-cover md:h-[198px] md:w-full"
                    />
                </div>
                <div>
                    <h3 className="mb-2 text-small1 font-medium leading-150 tracking-wider text-white md:mb-3 md:text-header5 md:leading-120">
                        比悲傷更悲傷的故事
                    </h3>
                    <h4 className="text-small2 leading-150 tracking-wide text-gray-5">
                        大直美麗華影城
                    </h4>
                </div>
            </div>
            <div className="mb-4 flex">
                <div className="space-x-1 rounded bg-gray-4 px-3 py-1">
                    <span className="text-small2 leading-120 tracking-wide text-white">
                        購買
                    </span>
                    <span
                        className={clsx(
                            'text-number5 font-bold leading-120 text-primary',
                            bellota.className,
                        )}>
                        2
                    </span>
                    <span className="text-small2 leading-120 tracking-wide text-white">
                        張
                    </span>
                </div>
            </div>
            <div>
                <div className="flex space-x-1 md:mb-4">
                    <span className="text-small2 leading-150 tracking-wide text-gray-5">
                        啟用日期
                    </span>
                    <span
                        className={clsx(
                            'text-number5 font-bold leading-150 text-white',
                            bellota.className,
                        )}>
                        2024.03.26
                    </span>
                </div>
                <div className="mb-6 flex space-x-1 md:mb-4">
                    <span className="text-small2 leading-150 tracking-wide text-gray-5">
                        票種
                    </span>
                    <span className="text-small2 leading-150 tracking-wide text-white">
                        一般版
                    </span>
                </div>
                <div className="border-t border-gray-4 pt-4 md:space-y-4 md:pt-6">
                    <div className="flex justify-between">
                        <span className="text-small2 leading-150 tracking-wide text-gray-5">
                            訂單編號
                        </span>
                        <span
                            className={clsx(
                                'text-number5 font-bold leading-150  text-white',
                                bellota.className,
                            )}>
                            043343290842
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-small2 leading-150 tracking-wide text-gray-5">
                            購買日期
                        </span>
                        <span
                            className={clsx(
                                'text-number5 font-bold leading-150 text-white',
                                bellota.className,
                            )}>
                            2024.03.26
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-small2 leading-150 tracking-wide text-gray-5">
                            付款金額
                        </span>
                        <span
                            className={clsx(
                                'text-number5 font-bold leading-150 text-white',
                                bellota.className,
                            )}>
                            NT$980
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
