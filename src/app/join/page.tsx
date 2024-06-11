'use client'
import React from 'react'
import Image from 'next/image'

import { Button, DatePicker, Input } from '@/components/common'
import { MultipleSelect } from '@/components/common'
import FilterOption from '@/components/Join/FilterOption'
import Event from '@/components/Join/Event'
import { SearchBtn } from '@/components/Buttons'

import { cn } from '@/utils'

// TODO: 待api完成後，需刪除
const dummyData = {
    county: [
        { label: '台北市', value: '1' },
        { label: '新北市', value: '2' },
        { label: '桃園市', value: '3' },
        { label: '新竹市', value: '4' },
        { label: '台中市', value: '5' },
    ],
    cinema: [
        { label: '真善美劇院', value: '1' },
        { label: '欣欣秀泰', value: '2' },
        { label: '國賓大戲院', value: '3' },
        { label: '台北松仁威秀', value: '4' },
        { label: '板橋威秀', value: '5' },
    ],
    movie: [
        { label: '功夫熊貓2', value: '1' },
        { label: '再見機器人', value: '2' },
        { label: '藍色恐懼', value: '3' },
        { label: '哥吉拉', value: '4' },
        { label: '沙丘2', value: '5' },
    ],
    events: [
        {
            img: '/assets/popcard1.jpg',
            title: '測試測試測試測試測試測試測試測試測試測試測試測試測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
        {
            img: '/assets/popcard1.jpg',
            title: '測試',
            movie: '沙丘2',
            cinema: '欣欣秀泰',
            attendance: 2,
            time: new Date(),
        },
    ],
}

const JoinPage = () => {
    // TODO: 資料來源須更新
    const shouldAddMoreSpace = dummyData.events.length > 6

    return (
        <div className="flex h-screen">
            {/* 篩選列 */}
            <div className="overflow-scroll bg-gray-1 px-6 scrollbar-hidden">
                <div className="py-10">
                    <p className="text-header4 text-white">篩選揪團</p>
                </div>

                <div className="flex flex-col gap-6">
                    <FilterOption title="時間" filter={<DatePicker />} />
                    <FilterOption
                        title="縣市"
                        filter={
                            <MultipleSelect
                                title="縣市"
                                options={dummyData.county}
                                selectedValues={['1', '2']}
                                // TODO: 待api完成後，新增篩選邏輯
                                onSelectChange={() => {}}
                            />
                        }
                    />
                    <FilterOption
                        title="地點"
                        filter={
                            <MultipleSelect
                                title="地點"
                                options={dummyData.cinema}
                                selectedValues={['2']}
                                // TODO: 待api完成後，新增篩選邏輯
                                onSelectChange={() => {}}
                            />
                        }
                    />
                    <FilterOption
                        title="電影"
                        filter={
                            <MultipleSelect
                                title="電影"
                                options={dummyData.movie}
                                selectedValues={['2', '5']}
                                // TODO: 待api完成後，新增篩選邏輯
                                onSelectChange={() => {}}
                            />
                        }
                    />
                </div>
                <div className="h-[200px] w-full" />
            </div>

            {/* 活動列 */}
            <div
                className={cn(
                    'flex flex-col gap-10 overflow-scroll px-6 py-10 scrollbar-hidden',
                    shouldAddMoreSpace && 'pb-[300px]',
                )}>
                {dummyData.events.map((item, index) => {
                    return (
                        <Event
                            img={item.img}
                            title={item.title}
                            movie={item.movie}
                            time={item.time}
                            attendance={item.attendance}
                            cinema={item.cinema}
                        />
                    )
                })}
            </div>

            {/* 地圖 */}
            <div className="relative flex-1 bg-white">
                {/* 搜尋欄 */}
                <div className="absolute left-6 top-6 inline-block">
                    <div className="relative shadow-sm">
                        <Input
                            type="text"
                            rounded="none"
                            value={''}
                            onChange={() => {}}
                            placeholder="輸入關鍵字"
                            className="h-16 w-screen py-5 md:h-16 md:w-[416px] md:rounded-full"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                            <SearchBtn type="search" active={true} />
                        </div>
                    </div>
                </div>
                {/* 地圖 */}
                <img
                    src="/icons/join/dummy_map_should_be_deleted.png"
                    alt="dummy map"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* 新增活動按鈕 */}
                <Button
                    type="button"
                    title="create join button"
                    onClick={() => {}}
                    className="absolute bottom-6 right-6 rounded-full bg-black p-5 hover:bg-black">
                    <Image
                        src="/icons/join/icon_add_join.png"
                        alt="Add Join event button"
                        width={18}
                        height={18}
                    />
                </Button>
            </div>
        </div>
    )
}

export default JoinPage
