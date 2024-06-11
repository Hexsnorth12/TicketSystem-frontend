'use client'

import React from 'react'
import { ModalContent } from '@/components/common'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    return (
        <>
            <ModalContent tittle="取得分票碼" hasCancel>
                <div className="mx-auto flex max-w-[500px] justify-center p-4">
                    <div className="rounded-l-lg border border-r-0 border-gray-3 bg-gray-1 px-3 py-2">
                        <p className="text-small1 text-white">3141232131231</p>
                    </div>
                    <div className="items-center rounded-r-lg border border-gray-3 bg-gray-1 px-3 py-2 text-primary hover:bg-primary hover:text-gray-1">
                        <span className="text-small2 md:text-small1">複製</span>
                    </div>
                </div>
            </ModalContent>
        </>
    )
}

export default Page
