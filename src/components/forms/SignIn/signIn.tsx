'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import Link from 'next/link'
import { InputComponent } from '../../common'
import { useAppDispatch } from '@/hooks/index'
import { userActions } from '@/stores/slices/userSlice'
import { useSignInMutation } from '@/services/apiSlice'
import { refreshAuth } from '@/lib'

export default function SingIn() {
    const dispatch = useAppDispatch()
    const [signIn] = useSignInMutation()

    const [username, setUsername] = useState('')
    const [passWord, setPassWord] = useState('')

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }
    const handleGoogleLogin = () => {}
    const handlePasswordChange = (value: string) => {
        setPassWord(value)
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await signIn({
                account: username,
                pwd: passWord,
            }).unwrap()
            await dispatch(userActions.login({ ...response }))
            //TODO: 後續要另外處理身份辨認跳轉到不同頁 ( 後台 or 首頁 )
            refreshAuth()
        } catch (error) {
            //TODO: alert Error
            console.log('ERROR', error)
        }
    }

    return (
        <>
            <div className="mx-auto min-w-96 text-center ">
                <h2 className="text-number5 font-bold tracking-tight text-white sm:text-header4 dark:text-gray-300">
                    立即登入
                </h2>
            </div>

            <form
                action="#"
                method="POST"
                className="mx-auto mt-6 min-w-96  sm:mt-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGoogleLogin}>
                            Google
                        </button>
                    </div>
                    <div className="flex items-center justify-center sm:col-span-2">
                        <div className="mr-4 flex-grow border-t border-gray-400"></div>
                        <div className="text-white dark:text-white">or</div>
                        <div className="ml-4 flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="sm:col-span-2">
                        <div>
                            <InputComponent
                                label={'使用者帳號'}
                                type={'text'}
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <InputComponent
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
                                className="block rounded-md text-center text-sm font-semibold text-white underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                忘記密碼嗎？
                            </a>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex items-center">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                                沒有帳號嗎？
                            </label>
                            <Link
                                href="/signup"
                                className="block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-300"
                                scroll={false}>
                                註冊
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit}>
                        登入
                    </button>
                </div>
            </form>
        </>
    )
}
