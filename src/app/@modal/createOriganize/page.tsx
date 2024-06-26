'use client'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
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
    SuccessModal,
} from '@/components/common'
import add_primary from '@icon/add_primary.svg'
import { JOIN_OPTIONS } from '@/definitions/joinForm'
import upLoadImage from '@/lib/uploadImage'
import { createJoinEvent } from '@/lib/join'

import { JoinEventRes, JoinEventSuccess, JoinPageError } from '@/types'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const router = useRouter()
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

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    function closeErrorModal() {
        setError('')
    }

    function closeSuccessModal() {
        setSuccess('')
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    async function onSubmit(data: FieldValues) {
        try {
            const {
                title,
                description,
                hostName,
                hostNickName,
                isBought,
                lineId,
                location,
                movie,
                person,
                phone,
                time,
            } = data
            const haveTicket = isBought === '是'
            // TODO: 需要優化
            const selectedHour = time.split(':')[0]
            const today = new Date()
            const date = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                selectedHour,
            )

            const result = (await createJoinEvent({
                title,
                time: date,
                haveTicket,
                placeholderImg: eventImgUrl,
                theater: location,
                movieTitle: movie,
                amount: person,
                content: description,
                participant: {
                    name: hostName,
                    nickname: hostNickName,
                    phone,
                    lineId,
                },
            })) as JoinEventRes

            if (result?.status === 'success') {
                const success = result as JoinEventSuccess
                setSuccess(success?.message)
                setTimeout(() => {
                    closeSuccessModal()
                    router.back()
                }, 1500)
                setTimeout(() => {
                    router.push('/join', { scroll: true })
                    window.location.reload()
                }, 1800)
            } else {
                const error = result as JoinPageError
                setError(error?.error)
            }
            // eslint-disable-next-line
        } catch (error: any) {
            setError(error?.message)
        }
    }

    return (
        <ModalContent tittle="">
            {/* 錯誤彈窗 */}
            {error && <ErrorModal onClose={closeErrorModal} errorMsg={error} />}
            {/* 成功彈窗 */}
            {success && <SuccessModal successMsg={success} />}

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
                    <div className="flex flex-col">
                        <label className="mb-2 text-small2 text-gray-5">
                            位置
                        </label>
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
                    </div>
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
                    <InputRegister
                        label="主揪人姓名"
                        type="text"
                        placeholder={''}
                        registerKey="hostName"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
                    <InputRegister
                        label="主揪人綽號"
                        type="text"
                        placeholder={''}
                        registerKey="hostNickName"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
                    <InputRegister
                        label="手機號碼"
                        type="text"
                        placeholder={''}
                        registerKey="phone"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
                    <InputRegister
                        label="Line ID"
                        type="text"
                        placeholder={''}
                        registerKey="lineId"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
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
