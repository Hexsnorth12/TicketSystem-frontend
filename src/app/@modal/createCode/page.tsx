'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { ModalContent } from '@/components/common'
import { useGetTransferCodeQuery } from '@/services/modules/product'
import { useSession } from 'next-auth/react'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId') ?? ''
    const productId = searchParams.get('productId') ?? ''
    const { data: session } = useSession()
    const { data, isLoading } = useGetTransferCodeQuery({
        payload: { orderId, productId },
        token: session?.accessToken ?? '',
    })
    const [isClipboard, setIsClipboard] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setIsClipboard(true)
    }

    return (
        <>
            <ModalContent tittle="取得分票碼" hasCancel>
                {isLoading ? (
                    <p className="text-body text-white">載入中...</p>
                ) : (
                    <div className="mx-auto flex max-w-[500px] justify-center p-4">
                        <div className="rounded-l-lg border border-r-0 border-gray-3 bg-gray-1 px-3 py-2">
                            <p className="text-small1 text-white">
                                {data?.shareCode}
                            </p>
                        </div>
                        <div
                            className="items-center rounded-r-lg border border-gray-3 bg-gray-1 px-3 py-2 text-primary hover:bg-primary hover:text-gray-1"
                            onClick={() =>
                                copyToClipboard(data!.shareCode)
                            }>
                            <span
                                className={clsx('text-small2 md:text-small1', {
                                    'text-primary': isClipboard,
                                })}>
                                複製
                            </span>
                        </div>
                    </div>
                )}
            </ModalContent>
        </>
    )
}

export default Page
