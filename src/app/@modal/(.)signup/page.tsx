import React from 'react'
import { Modal } from '@components/common'
import { SignUp } from '@components/forms'

const Page = () => {
    return (
        <Modal>
            <div className="mx-auto border-0 bg-gray-2 p-4">
                <SignUp />
            </div>
        </Modal>
    )
}

export default Page
