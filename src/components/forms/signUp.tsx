'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import Input from '../common/input'
import Checkbox from '../common/checkbox'
export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passWord, setPassWord] = useState('')
  const [checkPassWord, setCheckPassWord] = useState('')
  const [agree, setAgree] = useState('')

  const handleUsernameChange = (value: string) => {
    setUsername(value)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassWord(value)
  }

  const handleCheckPasswordChange = (value: string) => {
    setCheckPassWord(value)
  }

  const handleAgreeChange = (value: string) => {
    setAgree(value)
  }
  return (
    <>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-300">
          建立新帳號
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
                label={'使用者帳號'}
                type={'text'}
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          </div>
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
          <div className="sm:col-span-2">
            <Input
              label={'密碼'}
              type={'password'}
              value={passWord}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              label={'確認密碼'}
              type={'password'}
              value={checkPassWord}
              onChange={handleCheckPasswordChange}
            />
          </div>
          <div className="sm:col-span-2">
            <Checkbox
              label={'我已詳閱所有條款及同意個人資料'}
              value={agree}
              onChange={handleAgreeChange}
            />
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-center">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                已經有帳號了？
              </label>
              <a
                href="/login"
                className="block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white underline shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                登入
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            註冊
          </button>
        </div>
      </form>
    </>
  )
}
