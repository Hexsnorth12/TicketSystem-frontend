'use client'

import React from 'react'
import Image from 'next/image'
import { Modal, Button } from '@components/common'
import close_gray from '@icon/close_gray.svg'

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
    return (
        <Modal>
            <div className="container relative overflow-y-scroll rounded-lg border bg-gray-2 p-6 scrollbar-hidden md:py-10">
                <div className="absolute right-1 top-1">
                    <Image
                        src={close_gray}
                        alt="close"
                        height={24}
                        width={24}
                    />
                </div>
                <div className="mx-auto border align-middle">
                    {tittle && (
                        <h3 className="align-middle text-header5 text-white">
                            tittle
                        </h3>
                    )}
                    {children}
                </div>
                <div className="flex">
                    {hasCancel ? (
                        <Button
                            type={'button'}
                            title={'cancel'}
                            onClick={() => {}}>
                            <span>取消</span>
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
