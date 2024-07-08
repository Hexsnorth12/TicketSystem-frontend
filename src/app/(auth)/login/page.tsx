import React, { Suspense } from 'react'
import { SignIn } from '@components/forms'
import { getUserSession } from '@/lib/auth.actions'
import { redirect } from 'next/navigation'

const Page = async () => {
    const { session } = await getUserSession()

    if (session) {
        const redirectUrl =
            session.user.accountType === 'admin' ? '/admin/order' : '/'
        redirect(redirectUrl)
    }
    return (
        <div className="mx-auto p-4">
            <Suspense>
                <SignIn callbackUrl={''} />
            </Suspense>
        </div>
    )
}

export default Page
