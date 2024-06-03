'use client'

import React from 'react'
import Image from 'next/image'
import { Modal, Button } from '@components/common'
import close_gray from '@icon/close_gray.svg'
import { useRouter } from 'next/navigation'

interface ModalContentProps {
    children: React.ReactNode
    tittle?: string
    onConfirm?: () => void
    hasCancel?: boolean
}

const ModalContent: React.FC<ModalContentProps> = ({
    tittle,
    children,
    onConfirm,
    hasCancel = false,
}) => {
    const router = useRouter()

    const handleClose = () => {
        router.back()
    }
    return (
        <Modal>
            <div className="container relative overflow-y-scroll rounded-lg bg-gray-2 px-3 py-6 scrollbar-hidden md:p-10">
                <div
                    className="absolute right-[10px] top-[10px] cursor-pointer"
                    onClick={handleClose}>
                    <Image
                        src={close_gray}
                        alt="close"
                        height={24}
                        width={24}
                    />
                </div>
                <div className="mx-auto mb-[100px] md:mb-[200px]">
                    {tittle && (
                        <h3 className="mb-6 text-center text-header5 text-white md:mb-10 md:text-header4">
                            {tittle}
                        </h3>
                    )}
                    {children}
                </div>
                <div className="flex justify-center">
                    {hasCancel ? (
                        <Button
                            type={'button'}
                            title={'cancel'}
                            onClick={handleClose}
                            className="border-0 bg-gray-3 text-primary">
                            <span>關閉</span>
                        </Button>
                    ) : null}
                    {onConfirm ? (
                        <Button
                            type={'button'}
                            title={'confirm'}
                            onClick={onConfirm}>
                            <span>確認</span>
                        </Button>
                    ) : null}
                </div>
            </div>
        </Modal>
    )
}

export default ModalContent
