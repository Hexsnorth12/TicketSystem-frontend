'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import Link from 'next/link'
import { InputComponent } from '../../common'
import { useLoginMutation } from '@/services/modules/auth'
import { useAppDispatch } from '@/hooks/index'
import { i } from 'vitest/dist/reporters-xEmem8D4.js'
import { userActions } from '@/stores/slices/userSlice'

export default function SingIn() {
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState('')

    const [passWord, setPassWord] = useState('')

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassWord(value)
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await login({ account: username, pwd: passWord })
            //TODO: 統一處理 response 的 data
            //TODO: 重導到首頁
            console.log('response', response)
            // dispatch(userActions.login({ ...response.data }))
        } catch (error) {
            console.log('ERROR', error)
        }
    }

    return (
        <>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-300">
                    立即登入
                </h2>
            </div>

            <form
                action="#"
                method="POST"
                className="mx-auto mt-16 max-w-xl sm:mt-16">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Google
                        </button>
                    </div>
                    <div className="flex items-center justify-center sm:col-span-2">
                        <div className="mr-4 flex-grow border-t border-gray-400"></div>
                        <div className="text-gray-600">or</div>
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
                                className="block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-300">
                                註冊
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        // type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmit}>
                        登入
                    </button>
                </div>
            </form>
        </>
    )
}
