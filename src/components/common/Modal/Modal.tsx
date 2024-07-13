'use client'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import type { FC, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils'

interface ModalProps {
    children: ReactNode
    onClose?: () => void
    modalContainerStyle?: string
}

const Modal: FC<ModalProps> = ({
    children,
    onClose,
    modalContainerStyle = '',
}) => {
    const router = useRouter()

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            if (onClose) {
                onClose()
            } else {
                router.back()
            }
        }
    }

    return (
        <Dialog.Root open onOpenChange={handleOnOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 overflow-auto bg-black/70" />

                <Dialog.DialogContent
                    aria-describedby={'Common Modal content'}
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 my-8 max-h-[calc(100vh-138px)] max-w-[327px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto  rounded-lg bg-gray-2 px-3 py-6 scrollbar-hidden md:max-h-[calc(100vh-231px)] md:max-w-[1296px] md:overflow-y-scroll md:marker:scrollbar',
                        modalContainerStyle && modalContainerStyle,
                    )}>
                    <Dialog.DialogTitle></Dialog.DialogTitle>
                    <Dialog.Description></Dialog.Description>
                    {children}
                </Dialog.DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
