'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { Button, Input, SelectInput } from '@/components/common'
import { TaiwanCities } from '@/definitions/taiwanCities'
import Link from 'next/link'

export default function SearchForm() {
    const [name, setname] = useState('')
    const [selectedCity, setSelectedCity] = useState('') // 狀態用於存儲所選縣市
    const [selectedDistrict, setSelectedDistrict] = useState('') // 狀態用於存儲所選行政區
    console.log(selectedCity, selectedDistrict, 'selectedCity')

    const handleCityChange = (city: string) => {
        setSelectedCity(city)
        setSelectedDistrict('') // 當選擇新的縣市時，清空行政區選擇
    }

    const handleDistrictChange = (district: string) => {
        setSelectedDistrict(district)
    }
    const handleNameChange = (value: string) => {
        setname(value)
    }
    const handleOnclick = () => {
        console.log('onclick！')
    }
    const priceOptions = Array.from({ length: 8 }, (_, index) => {
        const start = index * 500 + 1
        const end = start + 499
        return `${start}-${end}`
    })
    return (
        <>
            <div className="mx-auto max-w-2xl text-center">
                <div className="text-header4 font-bold tracking-tight text-white  sm:text-header4">
                    查詢電影
                </div>
            </div>

            <form
                action="#"
                method="POST"
                className="mx-auto mt-6 max-w-xl sm:mt-6 ">
                <div className="grid grid-cols-1 items-end  gap-y-6 text-small1 text-gray-5 sm:grid-cols-2">
                    <div className="mb-2  sm:col-span-2 md:mb-10">
                        <Input
                            rounded="full"
                            placeholder={'輸入關鍵字'}
                            type={'text'}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <div className=" grid grid-cols-1 items-center justify-end gap-3 md:grid-cols-5">
                            <div className="col-span-1 md:col-span-1 ">
                                類別
                            </div>
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="票卷"
                                />
                            </div>
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="套票"
                                />
                            </div>
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="揪團"
                                />
                            </div>
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="分票"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 ">
                        <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                            <div className=" col-span-3 md:col-span-1 ">
                                地區 / 縣市
                            </div>
                            <div className="col-span-3 grow text-white md:col-span-2 ">
                                <SelectInput
                                    placeholder="請選擇"
                                    label="地區 / 縣市"
                                    options={Object.keys(TaiwanCities)}
                                    onSelectChange={handleCityChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 ">
                        <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                            <div className="col-span-3 md:col-span-1  ">
                                行政區
                            </div>
                            <div className="col-span-3 grow text-white md:col-span-2 ">
                                <SelectInput
                                    placeholder="請選擇"
                                    label="行政區"
                                    options={
                                        selectedCity &&
                                        TaiwanCities[selectedCity] // 这里是你选择城市的行政区
                                            ? TaiwanCities[selectedCity]
                                            : []
                                    }
                                    onSelectChange={handleDistrictChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 ">
                        <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                            <div className="col-span-3 md:col-span-1 ">
                                價錢
                            </div>
                            <div className="col-span-3 grow text-white md:col-span-2">
                                <SelectInput
                                    label="價錢範圍"
                                    options={priceOptions}
                                    onSelectChange={handleDistrictChange}
                                    placeholder="請選擇"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid items-end justify-center gap-y-2 text-small1 text-gray-5 md:mt-10 md:flex md:justify-center md:gap-x-8">
                    <div className="col-span-1 flex flex-col md:col-span-2 md:flex-row md:justify-center md:space-x-8">
                        <div className="col-span-3 grow text-white md:col-span-1">
                            <Button
                                type="submit"
                                title="表单按钮"
                                onClick={handleOnclick}
                                className="bg-gray-3 text-primary"
                                name="Ticketbutton"
                                value="取消">
                                取消
                            </Button>
                        </div>
                        <div className="col-span-3 mt-2 grow text-white md:col-span-1 md:mt-0">
                            <Link href="/search">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className=""
                                    name="Ticketbutton"
                                    value="搜尋">
                                    搜尋
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
