'use client'
import React from 'react'

import { Button, Modal } from '..'

type Props = {
    onClose: () => void
    errorMsg: string
}

const ErrorModal: React.FC<Props> = ({ onClose, errorMsg }) => {
    return (
        <Modal onClose={() => {}}>
            <div className="flex flex-col gap-5 px-6">
                <p className="text-center text-2xl font-bold text-white">
                    錯誤
                </p>
                <p className="text-white">{errorMsg}</p>
                <Button
                    type="button"
                    title="error-modal-button"
                    className="p-2 px-4"
                    onClick={onClose}>
                    <p className="text-sm">確認</p>
                </Button>
            </div>
        </Modal>
    )
}

export default ErrorModal
