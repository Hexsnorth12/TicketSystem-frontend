'use client'

import React from 'react'
import Image from 'next/image'
import empty from '@images/empty.png'
import Button from '../Button/button'

interface EmptyDataProps {}

const EmptyData: React.FC<EmptyDataProps> = () => {
    return (
        <div className="flex w-full flex-col items-center justify-between md:justify-center">
            <Image src={empty} alt={'no data exist'} width={180} height={180} />
            <p className="text-small1 tracking-wide text-gray-5 md:text-body md:tracking-wider">
                沒有購票紀錄
            </p>
            <Button
                className={'mt-8 px-4 py-2 md:mt-10 md:px-5 md:py-3'}
                type={'button'}
                title={'navigation'}
                onClick={() => {}}>
                <span className="text-btn2 md:text-btn1">回首頁找找</span>
            </Button>
        </div>
    )
}

export default EmptyData
