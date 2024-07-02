'use client'
import React, { useState, useEffect } from 'react'
import { Button, Input, SelectInput } from '@/components/common'
import { TaiwanCities } from '@/definitions/taiwanCities'
import { HomeSearch } from '@/definitions/homeSearch'
import Link from 'next/link'
import { number } from 'zod'
import {
    fetchResultProducts,
    fetchResult2Products,
    Product,
} from '@/definitions/movieData'

export default function SearchForm() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [title, settitle] = useState('') // 模糊搜尋
    const [selectedCity, setSelectedCity] = useState('') // 狀態用於存儲所選縣市
    const [selectedDistrict, setSelectedDistrict] = useState('') // 狀態用於存儲所選行政區
    // 商品列表
    const [selectedType, setSelectedType] = useState('') // 狀態用於存儲所選商品類別
    const [selectedGenre, setSelectedGenre] = useState('') // 狀態用於存儲所選電影分類
    const [selectedVendor, setSelectedVendor] = useState('') // 狀態用於存儲所選供應商
    const [selectedTheater, setSelectedTheater] = useState('') // 狀態用於存儲所選劇院位置
    // 揪團列表
    const [selectedhasticket, setSelectedhasticket] = useState('') // 狀態用於存儲所選有無票券
    const [selectedmovietitle, setSelectedmovietitle] = useState('') // 狀態用於存儲所選電影名稱
    const [selectedstatus, setSelectedstatus] = useState('ongoing') // 狀態用於存儲所選揪團狀態
    const [selectedcount, setSelectedcount] = useState('') // 狀態用於存儲所選揪團人數
    // 分票列表
    const [selectedID, setSelectedID] = useState('') // 狀態用於存儲所選票券編號列表
    const [selectedPublish, setSelectedPublish] = useState('') // 狀態用於存儲所選是否上架分票

    const [formType, setFormType] = useState<'ticket' | 'group' | 'split'>(
        'ticket',
    ) // 狀態用於存儲當前顯示的表單類型

    const handleFilterClick = () => {
        setIsFormOpen(true)
    }

    const handlePublishChange = (ticket: string) => {
        setSelectedPublish(ticket)
    }
    const handleDistrictChange = (district: string) => {
        setSelectedDistrict(district)
    }

    const handleNameChange = (value: string) => {
        settitle(value)
    }
    const handleOnclick = (type: 'ticket' | 'group' | 'split') => {
        setFormType(type)
    }

    const handleSearchClick = async () => {
        try {
            const products = await fetchResultProducts(selectedTheater)
            console.log('Fetched products:', products)
            setSelectedTheater(selectedTheater)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

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
                className="mx-auto mt-6 max-h-80  max-w-xl overflow-y-auto sm:mt-6">
                <div className=" mx-3 grid grid-cols-1  items-end gap-y-6 text-small1 text-gray-5 sm:grid-cols-2">
                    <div className="mb-2  sm:col-span-2 md:mb-10">
                        <Input
                            rounded="full"
                            placeholder={'輸入關鍵字'}
                            type={'text'}
                            value={title}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <div className=" grid grid-cols-1 items-center justify-end gap-3 md:grid-cols-5">
                            <div className="col-span-1 md:col-span-1 ">
                                類別
                            </div>
                            {/* 票券 */}
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={() => handleOnclick('ticket')}
                                    className="text-btn2 text-white"
                                    name="Categorybutton"
                                    value="票卷"
                                    disabled={formType === 'ticket'}
                                />
                            </div>
                            {/* 揪團 */}
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={() => handleOnclick('group')}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="揪團"
                                    disabled={formType === 'group'}
                                />
                            </div>
                            {/* 分票 */}
                            <div className="col-span-1 contents justify-center">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={() => handleOnclick('split')}
                                    className="text-btn2 text-white"
                                    name="Ticketbutton"
                                    value="分票"
                                    disabled={formType === 'split'}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 票券 */}
                    {formType === 'ticket' && (
                        <>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className=" col-span-3 md:col-span-1 ">
                                        商品類別
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <Input
                                            placeholder="corporateBooking,openAir"
                                            type={'text'}
                                            value={selectedType}
                                            onChange={(value: string) =>
                                                setSelectedType(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1  ">
                                        電影分類
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2">
                                        <Input
                                            placeholder="action,drama"
                                            type={'text'}
                                            value={selectedGenre}
                                            onChange={(value: string) =>
                                                setSelectedGenre(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1 ">
                                        供應商
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2">
                                        <Input
                                            placeholder="貓咪影業,小狗影業"
                                            type={'text'}
                                            value={selectedVendor}
                                            onChange={(value: string) =>
                                                setSelectedVendor(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1 ">
                                        劇院位置
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2">
                                        <Input
                                            placeholder="信義威秀,晶站威秀"
                                            type={'text'}
                                            value={selectedTheater}
                                            onChange={(value: string) =>
                                                setSelectedTheater(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {/* 揪團 */}
                    {formType === 'group' && (
                        <>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className=" col-span-3 md:col-span-1 ">
                                        是否持有票券
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <SelectInput
                                            placeholder="請選擇"
                                            label="是否持有票券"
                                            options={['是', '否']}
                                            onSelectChange={
                                                handleDistrictChange
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1  ">
                                        電影名稱
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <Input
                                            placeholder="電影名稱"
                                            type={'text'}
                                            value={selectedmovietitle}
                                            onChange={(value: string) =>
                                                setSelectedmovietitle(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1  ">
                                        電影院名稱
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <Input
                                            placeholder="電影院名稱"
                                            type={'text'}
                                            value={selectedTheater}
                                            onChange={(value: string) =>
                                                setSelectedTheater(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1 ">
                                        揪團狀態
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2">
                                        <SelectInput
                                            placeholder="請選擇"
                                            label="揪團狀態"
                                            options={[
                                                'ongoing',
                                                'cancelled',
                                                'completed',
                                            ]}
                                            onSelectChange={
                                                handleDistrictChange
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className="col-span-3 md:col-span-1 ">
                                        開團人數
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2">
                                        <Input
                                            placeholder="5"
                                            type={'text'}
                                            value={selectedcount}
                                            onChange={(value: string) =>
                                                setSelectedcount(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {/* 分票 */}
                    {formType === 'split' && (
                        <>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className=" col-span-3 md:col-span-1 ">
                                        票券編號
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <Input
                                            placeholder="票券編號列表"
                                            type={'text'}
                                            value={selectedID}
                                            onChange={(value: string) =>
                                                setSelectedID(value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-3 ">
                                <div className="grid grid-cols-1 items-center justify-end gap-2 md:grid-cols-3">
                                    <div className=" col-span-3 md:col-span-1 ">
                                        是否上架分票
                                    </div>
                                    <div className="col-span-3 grow text-white md:col-span-2 ">
                                        <SelectInput
                                            placeholder="請選擇"
                                            label="是否上架"
                                            options={['是', '否']}
                                            onSelectChange={handlePublishChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="mt-5 grid items-end justify-center gap-y-2 text-small1 text-gray-5 md:mt-10 md:flex md:justify-center md:gap-x-8">
                    <div className="col-span-1 flex flex-col md:col-span-2 md:flex-row md:justify-center md:space-x-8">
                        <div className="col-span-3 grow text-white md:col-span-1">
                            <Button
                                type="submit"
                                title="表單按鈕"
                                className="bg-gray-3 text-primary"
                                name="Ticketbutton"
                                onClick={handleFilterClick}
                                value="取消">
                                取消
                            </Button>
                        </div>
                        <div className="col-span-3 mt-2 grow text-white md:col-span-1 md:mt-0">
                            <Link href="/search/productresult">
                                <Button
                                    type="submit"
                                    title="表单按钮"
                                    onClick={handleSearchClick}
                                    className="bg-gray-8 text白色 ml-3 inline-flex justify-center rounded-full px-3 py-1.5 text-btn2 font-semibold shadow-sm hover:bg-gray-6 sm:ml-0"
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
