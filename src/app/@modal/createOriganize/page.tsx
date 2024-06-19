'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import {
    ModalContent,
    SelectInput,
    SelectBox,
    Button,
    TextArea,
    InputRegister,
    ErrorModal,
} from '@/components/common'
import add_primary from '@icon/add_primary.svg'
import { JOIN_OPTIONS } from '@/definitions/joinForm'
import upLoadImage from '@/lib/uploadImage'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const { data: session } = useSession()
    const token = session?.accessToken || ''
    const fileRef = useRef<HTMLInputElement>(null)

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()
    const [eventImgUrl, setEventImgUrl] = useState<string>('')

    const [error, setError] = useState('')

    const closeErrorModal = () => setError('')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('eventImg', file)

        const result = await upLoadImage(formData, 'user', token)
        if (result?.isSuccess) {
            setEventImgUrl(result?.url)
        } else {
            setError(result?.message)
        }
    }

    const onSubmit = (data: FieldValues) => {
        console.log(data)
        console.log(eventImgUrl)
    }

    return (
        <ModalContent tittle="">
            {/* 錯誤彈窗 */}
            {error && <ErrorModal onClose={closeErrorModal} errorMsg={error} />}

            <div className="flex min-w-[279px] flex-col px-3 md:flex-row md:items-center md:justify-between md:gap-10 md:py-[34px]">
                <div className="mx-auto mb-3 flex h-[120px] w-[120px] flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-3 bg-gray-1 md:h-[480px] md:w-[480px]">
                    {eventImgUrl ? (
                        <Image
                            alt="event image"
                            loader={() => eventImgUrl}
                            src={eventImgUrl}
                            width={480}
                            height={480}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <label
                            htmlFor="imageUpload"
                            className="flex h-full w-full cursor-pointer items-center justify-center">
                            <div className="flex flex-col items-center">
                                <Image
                                    src={add_primary}
                                    alt="add_primary"
                                    height={18}
                                    width={18}
                                    className="h-[18px] w-[18px]"
                                />
                                <p className="small2 text-white">新增照片</p>
                            </div>
                        </label>
                    )}
                </div>
                {/* 新增照片 */}
                <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    id="imageUpload"
                    onChange={handleFileChange}
                />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="w-full space-y-3 overflow-y-scroll md:max-h-[480px]  md:pr-10 md:scrollbar">
                    {/* TODO: 標題樣式需再討論 */}
                    {/* 先暫時隱藏 */}
                    {/* <h4 className="mb-10 hidden border-b border-gray-3 py-4 text-header4 text-gray-4 md:block">
                        新增活動標題
                    </h4> */}
                    <InputRegister
                        label="標題"
                        type="text"
                        placeholder={'新增活動標題'}
                        registerKey="title"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
                    <SelectBox title="位置">
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.locationOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="電影名稱">
                        <Controller
                            name="movie"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.movieOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="時間">
                        <Controller
                            name="time"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.timeOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="人數">
                        <Controller
                            name="person"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.personOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="是否買票">
                        <Controller
                            name="isBought"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.isBought}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <TextArea
                        label="描述"
                        placeholder="新增活動內容"
                        registerKey={'description'}
                        register={register}
                        required={true}
                    />
                    <div className="flex justify-center">
                        <Button
                            type={'submit'}
                            name="submit"
                            value="確認"
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
