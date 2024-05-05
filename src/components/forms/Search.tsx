'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import Tab, { TabPanel } from '../common/tab'
import Input from '../common/input'
import Checkbox from '../common/checkbox'
export default function SearchForm() {
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
          查詢電影
        </h2>
      </div>

      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              placeholder={'輸入關鍵字'}
              type={'text'}
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="sm:col-span-2">
            <div className="grid grid-cols-6 items-center gap-4">
              <div>類別</div>
              <div className="place-items-stretch">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  票券
                </button>
              </div>
              <div className="place-self-stretch">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  套票
                </button>
              </div>
              <div className="place-self-stretch">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  揪團
                </button>
              </div>
              <div className="place-self-stretch">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  分票
                </button>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="flex flex-row">
              <div className="basis-1/4">類別</div>
              <div className="basis-3/4  text-center">02</div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="flex flex-row">
              <div className="basis-1/4">行政區</div>
              <div className="basis-3/4  text-center">02</div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="flex flex-row">
              <div className="basis-1/4">價錢</div>
              <div className="basis-3/4  text-center">02</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <button
            type="submit"
            className="block w-1/4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            取消
          </button>
          <button
            type="submit"
            className="block w-1/4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            搜尋
          </button>
        </div>
      </form>
    </>
  )
}
