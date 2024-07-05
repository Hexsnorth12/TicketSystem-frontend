'use client' // This is a client component 👈🏽
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { InputComponent } from '../../common'
import { Button } from '@/components/common'
import GoogleSignInButton from '../../Buttons/GoogleBtn'
import { useSearchParams, useRouter } from 'next/navigation'
import fetchClient from '@/lib/fetchClient'
import { useCartStore } from '@/stores/useCartStore'

interface SignInProps {
    callbackUrl: string
}

const SignIn = ({ callbackUrl }: SignInProps) => {
    const [username, setUsername] = useState('')
    const [passWord, setPassWord] = useState('')
    const [errorMsg, setErrorMessage] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            const redirectUrl =
                session?.user.accountType === 'admin' ? '/admin/order' : '/'
            router.push(redirectUrl)
        }
    }, [session, status, searchParams, router])

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassWord(value)
    }

    const mergeCart = useCartStore((state) => state.mergeCarts)
    const fetchCartData = async () => {
        const response = await fetchClient({
            method: 'GET',
            url: `api/v1/cart?limit=${100}&page=${1}`,
        })

        const userCart = response.data
        if (userCart && userCart.items) {
            mergeCart(userCart.items)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const credentials = Object.fromEntries(formData)

        const response = await signIn('credentials', {
            ...credentials,
            redirect: false,
        })
        if (response?.error) {
            setErrorMessage(response.error)
        } else {
            setErrorMessage('')
            fetchCartData()
        }
    }

    return (
        <>
            <div className="text-center">
                <h2 className="text-header5 font-bold tracking-wide text-white md:text-header4">
                    立即登入
                </h2>
            </div>

            <form className="mx-auto mt-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <GoogleSignInButton callbackUrl={callbackUrl}>
                            Google
                        </GoogleSignInButton>
                    </div>
                    <div className="flex items-center justify-center sm:col-span-2">
                        <div className="mr-4 flex-grow border-t border-gray-400"></div>
                        <div className="text-white dark:text-white">or</div>
                        <div className="ml-4 flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="sm:col-span-2">
                        <div>
                            <InputComponent
                                name={'account'}
                                label={'使用者帳號'}
                                type={'text'}
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <InputComponent
                            name={'pwd'}
                            label={'密碼'}
                            type={'password'}
                            value={passWord}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    {/* <div className="sm:col-span-2">
                        <div className="flex items-center">
                            <a
                                href="/forgetPassWord"
                                className="text-center text-small2 font-semibold text-white underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:text-small1">
                                忘記密碼嗎？
                            </a>
                        </div>
                    </div> */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center py-2.5 ">
                            <label
                                htmlFor="message"
                                className="block text-small2 font-semibold leading-6 text-primary md:text-small1">
                                沒有帳號嗎？
                            </label>
                            <Link
                                href="/signup"
                                className="focus-visible:outline-indigo-60 block rounded-md px-3.5 text-center text-small2 font-semibold text-primary underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:text-small1"
                                scroll={false}>
                                註冊
                            </Link>
                        </div>
                    </div>
                </div>
                {errorMsg ? (
                    <p className="text-small1 font-bold text-red-500">
                        {errorMsg}
                    </p>
                ) : null}
                <div className="mt-10">
                    <Button
                        name="signin"
                        value="登入"
                        type={'submit'}
                        title="signin"
                        className="w-full rounded-md py-3 text-btn2 font-semibold text-white md:text-btn1"></Button>
                </div>
            </form>
        </>
    )
}

export default SignIn
