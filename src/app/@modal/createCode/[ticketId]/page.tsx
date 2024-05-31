'use client'

import React from 'react'
import { ModalContent } from '@/components/common'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    return (
        <>
            <ModalContent tittle="取得分票碼" hasCancel>
                <div className="p-4">
                    <div>
                        <p>314123213123123213</p>
                    </div>
                </div>
            </ModalContent>
        </>
    )
}

export default Page
