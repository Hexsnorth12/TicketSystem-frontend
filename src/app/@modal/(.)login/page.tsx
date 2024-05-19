import React from 'react'
import { Modal } from '@components/common'
import { SignIn } from '@components/forms'

const Page = () => {
    return (
        <Modal>
            <div className="mx-auto border-0 bg-gray-5 p-4">
                <SignIn />
            </div>
        </Modal>
    )
}

export default Page
