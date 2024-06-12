'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useForm, FieldPath, FieldValues } from 'react-hook-form'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ModalContent, Button, InputRegister, Tag } from '@/components/common'
import { bellota } from '@/components/fonts'
import account_gray from '@icon/account_gray.svg'
import fakeImage from '@images/groupcard1.png'
import { getJoinForm } from '@/lib'
import { State } from '@/types'

export interface FormValues {
    name: string
    nickName: string
    phone: number
    lineId: string
    group: string
}

interface pageProps {
    searchParams?: { [key: string]: string }
}

const Page: React.FC<pageProps> = ({ searchParams }) => {
    //URL 傳入 group id
    const groupId = searchParams!.groupId

    const router = useRouter()

    const {
        register,
        formState: { errors },
        setError,
    } = useForm<FieldValues>()
    const [state, formAction] = useFormState<State, FormData>(getJoinForm, null)

    useEffect(() => {
        if (!state) return

        if (state.status === 'error') {
            state.errors?.forEach((error) => {
                setError(error.path as FieldPath<FormValues>, {
                    message: error.message,
                })
            })
        }
        if (state.status === 'success') {
            router.push('success?state=true&callback=user/sharedTicket')
        }
    }, [state, setError])

    return (
        <ModalContent tittle="">
            <div className="min-w-[279px] px-5 md:px-12 md:py-9">
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <Image
                        src={fakeImage}
                        alt="group"
                        className="w-full rounded-lg"
                    />
                    <div className="max-h-[184px] overflow-y-scroll pr-6 scrollbar">
                        <h5 className="mb-1 text-small1 text-white md:mb-2 md:text-header5">
                            下班一起看沙丘！上班好累喔～
                        </h5>
                        <p className="mb-3 text-small2 text-gray-5 md:mb-4 md:text-small1">
                            沙丘2
                        </p>
                        <Tag
                            icon={FaMapMarkerAlt}
                            tagValue={'欣欣秀泰'}
                            iconColor="gray-4"
                            position="left"
                            textStyle="text-small2 md:text-small1 text-white"
                        />
                        <div className="mb-3 mt-3 flex flex-col items-start gap-3 md:mb-4 md:mt-4 md:flex-row md:items-center">
                            <div className="flex-1 rounded-md bg-gray-3 px-3 py-1 ">
                                <span className="text-nowrap text-small2 text-white">
                                    已買票
                                </span>
                            </div>
                            <div className="flex w-full justify-between">
                                <p
                                    className={clsx(
                                        'text-number5 text-primary',
                                        bellota.className,
                                    )}>
                                    2024.03.22 20:15
                                </p>
                                <div className="flex gap-1">
                                    <Image
                                        src={account_gray}
                                        alt="join person amount"
                                        width={16}
                                        height={16}
                                    />
                                    <p
                                        className={clsx(
                                            'space-x-1 text-number5',
                                            bellota.className,
                                        )}>
                                        <span className="text-primary">2</span>
                                        <span className="text-gray-5">/</span>
                                        <span className="text-gray-5">4</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-small2 text-gray-5 md:text-small1">
                            看了主管一整天的臭臉，需要用甜茶老公來洗眼睛3結束有精神的話，一起去吃friday!
                        </p>
                    </div>
                </div>
                <form
                    action={(formData) => formAction(formData)}
                    className="md:border-t md:border-gray-3 md:pt-6">
                    <h4 className="md:header-4 mb-2 text-btn1 text-white md:mb-6">
                        我要參加
                    </h4>
                    <div className="mb-3 flex flex-col gap-3 md:mb-4 md:flex-row md:justify-between md:gap-4">
                        <InputRegister
                            label="姓名"
                            type="text"
                            placeholder={'請輸入姓名'}
                            registerKey="name"
                            register={register}
                            defaultValue={''}
                            errors={errors}
                            required={true}
                        />
                        <InputRegister
                            label="暱稱"
                            type="text"
                            placeholder={'請輸入暱稱'}
                            registerKey="nickName"
                            register={register}
                            defaultValue={''}
                            errors={errors}
                            required={true}
                        />
                    </div>
                    <div className="mb-3 flex flex-col gap-3 md:mb-6 md:flex-row md:justify-between md:gap-4">
                        <InputRegister
                            label="聯絡電話"
                            type="text"
                            placeholder={'請輸入聯絡電話'}
                            registerKey="phone"
                            register={register}
                            defaultValue={''}
                            errors={errors}
                            required={true}
                        />
                        <InputRegister
                            label="LINE ID"
                            type="text"
                            placeholder={'請輸入LINE ID'}
                            registerKey="lineId"
                            register={register}
                            defaultValue={''}
                            errors={errors}
                            required={true}
                        />
                    </div>
                    <div className="absolute opacity-0">
                        <InputRegister
                            label="group"
                            type="text"
                            placeholder={''}
                            registerKey="group"
                            register={register}
                            defaultValue={groupId}
                            errors={errors}
                            required={true}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type={'submit'}
                            name="submit"
                            value="一起看電影！"
                            title={'confirm'}
                            onClick={() => {}}
                        />
                    </div>
                </form>
            </div>
        </ModalContent>
    )
}

export default Page
