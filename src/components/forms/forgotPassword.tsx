'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import Input from '../common/input'

export default function ForgetPassWord() {
  const [email, setEmail] = useState('')

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-300">
          忘記密碼
        </h2>
      </div>

      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div>
              <Input
                label={'電子信箱'}
                type={'email'}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            寄出驗證信
          </button>
        </div>
      </form>
    </>
  )
}
