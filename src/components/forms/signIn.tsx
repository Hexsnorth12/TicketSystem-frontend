'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { Input } from '../common'

export default function SingIn() {
    const [username, setUsername] = useState('')

    const [passWord, setPassWord] = useState('')

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassWord(value)
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
                            <Input
                                label={'使用者帳號'}
                                type={'text'}
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Input
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
                            <a
                                href="/login"
                                className="block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                註冊
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        登入
                    </button>
                </div>
            </form>
        </>
    )
}
