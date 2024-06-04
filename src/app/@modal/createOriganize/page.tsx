'use client'
import React from 'react'
import Image from 'next/image'
import { ModalContent, SelectInput, InputRegister } from '@/components/common'
import add_primary from '@icon/add_primary.svg'

interface pageProps {}

const list = ['北部', '中部', '南部', '東部', '離島']

const Page: React.FC<pageProps> = () => {
    return (
        <ModalContent tittle="">
            <div className="flex flex-col md:flex-row">
                <div className="mx-auto mb-3 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-lg border border-gray-3 bg-gray-1">
                    <Image
                        src={add_primary}
                        alt="add_primary"
                        height={18}
                        width={18}
                        className="h-[18px] w-[18px]"
                    />
                    <p className="small2 text-white">新增照片</p>
                </div>
                <form action="位置" className="space-y-3">
                    <SelectInput
                        placeholder="請選擇"
                        label={'位置'}
                        options={list}
                        onSelectChange={() => {}}
                    />
                    <SelectInput
                        placeholder="請選擇"
                        label={'位置'}
                        options={list}
                        onSelectChange={() => {}}
                    />
                    <SelectInput
                        placeholder="請選擇"
                        label={'位置'}
                        options={list}
                        onSelectChange={() => {}}
                    />
                </form>
            </div>
        </ModalContent>
    )
}

export default Page
