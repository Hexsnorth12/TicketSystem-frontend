'use client'
import React from 'react'
import Image from 'next/image'
import {
    ModalContent,
    SelectInput,
    InputComponent,
    Button,
} from '@/components/common'
import add_primary from '@icon/add_primary.svg'

interface pageProps {}

const list = ['北部', '中部', '南部', '東部', '離島']

const Page: React.FC<pageProps> = () => {
    return (
        <ModalContent tittle="">
            <div className="flex min-w-[279px] flex-col px-3 md:flex-row md:items-center md:justify-between md:gap-10 md:py-[34px]">
                <div className="mx-auto mb-3 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-lg border border-gray-3 bg-gray-1 md:h-[480px] md:w-[480px]">
                    <Image
                        src={add_primary}
                        alt="add_primary"
                        height={18}
                        width={18}
                        className="h-[18px] w-[18px]"
                    />
                    <p className="small2 text-white">新增照片</p>
                </div>
                <form
                    action="位置"
                    className="w-full space-y-3 overflow-y-scroll md:max-h-[480px]  md:pr-10 md:scrollbar">
                    <h4 className="mb-10 hidden border-b border-gray-3 py-4 text-header4 text-gray-4 md:block">
                        新增活動標題
                    </h4>
                    <InputComponent
                        label="標題"
                        type="text"
                        value=""
                        onChange={() => {}}
                        placeholder="新增活動標題"
                    />
                    <div>
                        <p className="mb-2 text-small2 text-gray-5">位置</p>
                        <SelectInput
                            placeholder="請選擇"
                            label={''}
                            options={list}
                            onSelectChange={() => {}}
                        />
                    </div>
                    <div>
                        <p className="mb-2 text-small2 text-gray-5">電影名稱</p>
                        <SelectInput
                            placeholder="請選擇"
                            label={''}
                            options={list}
                            onSelectChange={() => {}}
                        />
                    </div>
                    <div>
                        <p className="mb-2 text-small2 text-gray-5">時間</p>
                        <SelectInput
                            placeholder="請選擇"
                            label={''}
                            options={list}
                            onSelectChange={() => {}}
                        />
                    </div>
                    <div>
                        <p className="mb-2 text-small2 text-gray-5">人數</p>
                        <SelectInput
                            placeholder="請選擇"
                            label={''}
                            options={list}
                            onSelectChange={() => {}}
                        />
                    </div>
                    <div>
                        <p className="mb-2 text-small2 text-gray-5">是否買票</p>
                        <SelectInput
                            placeholder="請選擇"
                            label={''}
                            options={list}
                            onSelectChange={() => {}}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type={'button'}
                            title={'confirm'}
                            onClick={() => {}}>
                            <span>確認</span>
                        </Button>
                    </div>
                </form>
            </div>
        </ModalContent>
    )
}

export default Page
