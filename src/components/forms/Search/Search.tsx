'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { Button, Input, SelectInput } from '@/components/common/index'
import { TaiwanCities } from '@/definitions/taiwanCities'

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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-300">
                    查詢電影
                </h2>
            </div>

            <form
                action="#"
                method="POST"
                className="mx-auto mt-16 max-w-xl sm:mt-16 ">
                <div className="grid grid-cols-1 items-end gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <Input
                            placeholder={'輸入關鍵字'}
                            type={'text'}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <div className="grid grid-cols-5 justify-end gap-3">
                            <div className="col-span-1">類別</div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className=""
                                    name="Ticketbutton"
                                    value="Ticketvalue">
                                    票卷
                                </Button>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className=""
                                    name="Ticketbutton"
                                    value="Ticketvalue">
                                    套票
                                </Button>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className=""
                                    name="Ticketbutton"
                                    value="Ticketvalue">
                                    揪團
                                </Button>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleOnclick}
                                    className=""
                                    name="Ticketbutton"
                                    value="Ticketvalue">
                                    分票
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">地區 / 縣市</div>
                            <div className="grow basis-3/4">
                                <SelectInput
                                    placeholder="請選擇"
                                    label="地區 / 縣市"
                                    options={Object.keys(TaiwanCities)}
                                    onSelectChange={handleCityChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">行政區</div>
                            <div className="grow basis-3/4">
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
                    <div className="sm:col-span-2">
                        <div className="flex flex-row">
                            <div className="basis-1/4">價錢</div>
                            <div className="grow basis-3/4">
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

                <div className="mt-10 flex justify-center gap-4">
                    <Button
                        type="submit"
                        title="表单按钮"
                        onClick={handleOnclick}
                        className=""
                        name="Ticketbutton"
                        value="Ticketvalue">
                        取消
                    </Button>
                    <Button
                        type="submit"
                        title="表单按钮"
                        onClick={handleOnclick}
                        className=""
                        name="Ticketbutton"
                        value="Ticketvalue">
                        搜尋
                    </Button>
                </div>
            </form>
        </>
    )
}
