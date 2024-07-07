'use client'

import React, { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useForm, FieldPath, FieldValues } from 'react-hook-form'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'
import {
    ModalContent,
    Button,
    InputRegister,
    Tag,
    ErrorModal,
    Modal,
} from '@/components/common'
import { bellota } from '@/components/fonts'
import account_gray from '@icon/account_gray.svg'
import { getJoinForm } from '@/lib'
import { getEventDetail } from '@/lib/join'
import { formatJoinEventDate } from '@/utils'

import type {
    Event,
    EventDetailRes,
    EventDetailSuccess,
    JoinPageError,
    State,
} from '@/types'

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

    const [eventDetail, setEventDetail] = useState<Partial<Event>>({})
    const [eventError, setEventError] = useState('')

    const haveTicketString = eventDetail?.haveTicket ? '已買票' : '未買票'
    const formattedDate = formatJoinEventDate(
        new Date(eventDetail?.time as string),
    )

    const {
        register,
        formState: { errors },
        setError,
    } = useForm<FieldValues>()
    const [state, formAction] = useFormState<State, FormData>(getJoinForm, null)
    const [pending, startTransaction] = useTransition()

    useEffect(() => {
        try {
            fetchDetail()
            // eslint-disable-next-line
        } catch (error: any) {
            setEventError(error.message)
        }
    }, [])

    useEffect(() => {
        if (!state) return

        const { status } = state
        if (status === 'error') {
            state.errors?.forEach((error) => {
                setError(error.path as FieldPath<FormValues>, {
                    message: error.message,
                })
            })
        }
        if (status === 'success') {
            router.push('success?state=true&callback=user/join?status=joined')
        } else {
            setEventError(state?.message)
        }
    }, [state, setError])

    async function fetchDetail() {
        const result = (await getEventDetail(groupId)) as EventDetailRes

        if (result!.status === 'success') {
            const success = result as EventDetailSuccess
            setEventDetail(success.data)
        } else {
            const error = (result as JoinPageError).error
            setEventError(error)
        }
    }

    function closeModal() {
        setEventError('')
        router.back()
    }

    return (
        <ModalContent tittle="">
            {/* 錯誤彈窗 */}
            {eventError && (
                <ErrorModal onClose={closeModal} errorMsg={eventError} />
            )}

            {pending && (
                <Modal onClose={() => {}}>
                    <div className="flex w-[150px] flex-col gap-5 px-6">
                        <div className="flex items-center justify-center">
                            <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-b-transparent border-l-primary border-r-primary border-t-primary"></div>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="min-w-[279px] px-5 md:px-12 md:py-9">
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <div className="max-h-[173px] overflow-hidden rounded-lg">
                        <Image
                            loader={() => eventDetail.placeholderImg as string}
                            src={eventDetail.placeholderImg as string}
                            alt="group"
                            width={288}
                            height={173}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="max-h-[184px] w-[280px] overflow-x-hidden overflow-y-scroll pr-6 scrollbar">
                        <h5 className="mb-1 text-small1 text-white md:mb-2 md:text-header5">
                            {eventDetail.title}
                        </h5>
                        <p className="mb-3 text-small2 text-gray-5 md:mb-4 md:text-small1">
                            {eventDetail.movieTitle}
                        </p>
                        <Tag
                            icon={FaMapMarkerAlt}
                            tagValue={eventDetail.theater as string}
                            iconColor="gray-4"
                            position="left"
                            textStyle="text-small2 md:text-small1 text-white"
                        />
                        <div className="mb-3 mt-3 flex flex-col items-start gap-3 md:mb-4 md:mt-4">
                            <div className="flex-1 rounded-md bg-gray-3 px-3 py-1 ">
                                <span className="text-nowrap text-small2 text-white">
                                    {haveTicketString}
                                </span>
                            </div>
                            <div className="flex w-full justify-between">
                                <p
                                    className={clsx(
                                        'text-number5 text-primary',
                                        bellota.className,
                                    )}>
                                    {formattedDate}
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
                                        <span className="text-primary">
                                            {(eventDetail.amount as number) -
                                                (eventDetail!
                                                    .vacancy as number)}
                                        </span>
                                        <span className="text-gray-5">/</span>
                                        <span className="text-gray-5">
                                            {eventDetail.amount}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-small2 text-gray-5 md:text-small1">
                            {eventDetail.content}
                        </p>
                    </div>
                </div>
                <form
                    action={(formData) => {
                        startTransaction(() => {
                            formAction(formData)
                        })
                    }}
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
                    <div className="absolute hidden">
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
