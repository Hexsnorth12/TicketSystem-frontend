import React, { Suspense } from 'react'
import { SignIn } from '@components/forms'

const Page = () => {
    return (
        <div className="mx-auto p-4">
            <Suspense>
                <SignIn callbackUrl={''} />
            </Suspense>
        </div>
    )
}

export default Page
