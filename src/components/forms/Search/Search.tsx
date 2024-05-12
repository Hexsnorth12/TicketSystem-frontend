'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { Button, Input, Select } from '@/components/common/index'
export default function SearchForm() {
    const [username, setUsername] = useState('')
    const handleUsernameChange = (value: string) => {
        setUsername(value)
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
                                <Button type="submit">票卷</Button>
                            </div>
                            <div className="place-self-stretch">
                                <Button type="submit">套票</Button>
                            </div>
                            <div className="place-self-stretch">
                                <Button type="submit">揪團</Button>
                            </div>
                            <div className="place-self-stretch">
                                <Button type="submit">分票</Button>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">地區 / 縣市</div>
                            <div className="grow basis-3/4 ">
                                <Select />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">行政區</div>
                            <div className="grow basis-3/4 ">
                                <Select />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">價錢</div>
                            <div className="grow basis-3/4 ">
                                <Select />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex justify-center gap-4">
                    <Button type="submit">取消</Button>
                    <Button type="submit">蒐尋</Button>
                </div>
            </form>
        </>
    )
}
