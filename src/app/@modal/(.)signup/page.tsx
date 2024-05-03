import React from 'react'
import { Modal } from '@components/common'
import { SignUp } from '@components/forms'

const Page = () => {
    return (
        <Modal>
            <div className="mx-auto border p-4">
                <SignUp />
            </div>
        </Modal>
    )
}

export default Page
