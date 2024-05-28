'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { InputComponent } from '../../common'
import { Button } from '@/components/common'
import google_logo from '@icon/google_logo.svg'
import { refreshAuth } from '@/lib'
import { useSearchParams } from 'next/navigation'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [passWord, setPassWord] = useState('')
    const [errorMsg, setErrorMessage] = useState('')
    const searchParams = useSearchParams()

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }
    const handleGoogleLogin = () => {}
    const handlePasswordChange = (value: string) => {
        setPassWord(value)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const credentials = Object.fromEntries(formData)
        //TODO: 後續要另外處理身份辨認跳轉到不同頁 ( 後台 or 首頁 )

        const response = await signIn('credentials', {
            ...credentials,
            redirect: false,
        })

        if (response?.error) {
            setErrorMessage(response.error)
        } else {
            const callbackUrl = searchParams.get('callbackUrl') || '/'

            setErrorMessage('')
            refreshAuth(callbackUrl)
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
                        <Button
                            type={'button'}
                            title="登入"
                            onClick={handleGoogleLogin}
                            className="flex w-full items-center justify-center rounded-md py-3 text-btn2 text-white md:text-btn1">
                            <Image
                                src={google_logo}
                                width={18}
                                height={18}
                                alt="use google account login align-middle"
                                className="-mb-0.5 mr-2"
                            />
                            <span>Google</span>
                        </Button>
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
                    <div className="sm:col-span-2">
                        <div className="flex items-center">
                            <a
                                href="/forgetPassWord"
                                className="text-center text-small2 font-semibold text-white underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:text-small1">
                                忘記密碼嗎？
                            </a>
                        </div>
                    </div>
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
