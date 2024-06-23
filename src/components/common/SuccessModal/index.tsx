'use client'
import React from 'react'

import { Modal } from '..'

type Props = {
    successMsg: string
}

const SuccessModal: React.FC<Props> = ({ successMsg }) => {
    return (
        <Modal onClose={() => {}}>
            <div className="flex w-[200px] flex-col gap-5 px-6">
                <p className="text-center text-2xl font-bold text-white">
                    提示
                </p>
                <p className="text-center text-white">{successMsg}</p>
            </div>
        </Modal>
    )
}

export default SuccessModal
