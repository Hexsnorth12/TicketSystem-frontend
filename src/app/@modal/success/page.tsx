'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/common'
import { useRouter, useSearchParams } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callback = searchParams.get('callback') as string
    const state = !!searchParams.get('state') ?? false
    const [isOpen, setIsOpen] = useState(false)

    const handleOnclick = () => {
        router.push(callback)
        setIsOpen(false)
    }
    useEffect(() => {
        if (!state) return
        setIsOpen(state)
    }, [state])
    return (
        <>
            <Dialog.Root open={isOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 overflow-auto bg-black/70" />

                    <Dialog.DialogContent className="fixed left-1/2 top-1/2 z-50 my-8 max-h-[calc(100vh-138px)] max-w-[327px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto  rounded-lg bg-gray-2 px-3 py-6 scrollbar-hidden md:max-h-[calc(100vh-231px)] md:max-w-[1296px] md:overflow-y-hidden md:marker:scrollbar">
                        <div className="mx-auto space-y-4 p-6 text-center md:p-10">
                            <h3 className="text-header5 text-white">成功</h3>
                            <p className="text-body text-white">成功送出表單</p>
                            <Button
                                type="button"
                                title="按钮"
                                onClick={handleOnclick}
                                className="text-nowrap py-2 md:px-4 md:py-2">
                                <span className="text-btn2 md:text-btn1">
                                    確認
                                </span>
                            </Button>
                        </div>
                    </Dialog.DialogContent>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default Page
