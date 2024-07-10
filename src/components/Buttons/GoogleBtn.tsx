import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/common'
import google_logo from '@icon/google_logo.svg'

interface GoogleSignInButtonProps {
    children: React.ReactNode
    callbackUrl: string
}
const GoogleSignInButton = ({
    children,
    callbackUrl,
}: GoogleSignInButtonProps) => {
    const loginWithGoogle = async () => {
        await signIn('google', { callbackUrl })
    }

    return (
        <Button
            type="button"
            title="登入"
            onClick={loginWithGoogle}
            className="flex w-full items-center justify-center rounded-md py-3 text-btn2 text-white md:text-btn1">
            <Image
                src={google_logo}
                width={18}
                height={18}
                alt="use google account login align-middle"
                className="-mb-0.5 mr-2"
            />
            {children}
        </Button>
    )
}

export default GoogleSignInButton
