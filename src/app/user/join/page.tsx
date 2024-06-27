'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import {
    Button,
    EmptyData,
    ErrorModal,
    Modal,
    SuccessModal,
} from '@/components/common'
import { getMyJoinEventList, leaveEvent, updateEvent } from '@/lib/join'
import clsx from 'clsx'

import {
    EventList,
    GetEventListRes,
    JoinEventRes,
    JoinEventSuccess,
    JoinPageError,
    JoinPageSuccess,
} from '@/types'
import UpdateEventModal from '@/components/Join/UpdateEventModal'
import { cn, formatJoinEventDate } from '@/utils'

interface pageProps {
    searchParams?: { [key: string]: string }
}

const PAGE = 1

const Page: React.FC<pageProps> = ({ searchParams }) => {
    const router = useRouter()
    const status = searchParams?.status ?? 'own'

    const [eventList, setEventList] = useState<EventList>([])

    const [showParticipants, setShowParticipants] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDoubleConfirmModal, setShowDoubleConfirmModal] = useState(false)

    const [groupId, setGroupId] = useState('')

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        renderData()
    }, [])

    useEffect(() => {
        renderData()
    }, [status])

    async function renderData() {
        const result = (await getMyJoinEventList(
            status,
            PAGE,
        )) as GetEventListRes

        if (result!.status === 'success') {
            const success = result as JoinPageSuccess
            setEventList(success.events)
        } else {
            const failed = result as JoinPageError
            setError(failed.error)
        }
    }

    async function changeEventStatus(
        type: string,
        updateData: Partial<{ title: string; content: string }> = {},
    ) {
        let result: JoinEventRes
        switch (type) {
            case 'update':
                result = await updateEvent(
                    groupId,
                    updateData as { title: string; content: string },
                )
                break
            case 'leave':
                result = await leaveEvent(groupId)
                break
        }

        if (result!.status === 'success') {
            const success = result as JoinEventSuccess
            setSuccess(success.message)
            setTimeout(() => {
                closeSuccessModal()
            }, 1500)
        } else {
            const failed = result as JoinPageError
            console.log('failed: ', failed)
            setError(failed.error)
        }
    }

    function updateEventHandler(updateData: {
        title: string
        content: string
    }) {
        changeEventStatus('update', updateData)
    }

    function changeTabHandler(type: 'own' | 'joined') {
        router.push(`/user/join?status=${type}`)
    }

    function closeSuccessModal() {
        setSuccess('')
        // 更新全部資料
        renderData()
    }

    function closeErrorModal() {
        setError('')
    }

    function openUpdateEventModal(groupId: string) {
        setShowUpdateModal(true)
        setGroupId(groupId)
    }

    function closeUpdateEventModal() {
        setShowUpdateModal(false)
        setGroupId('')
    }

    function toggleParticipantList() {
        setShowParticipants((prevState) => !prevState)
    }

    function openDoubleConfirmModal(groupId: string) {
        setShowDoubleConfirmModal(true)
        setGroupId(groupId)
    }

    function confirmToLeaveEvent() {
        closeDoubleConfirmModal()
        changeEventStatus('leave')
    }

    function closeDoubleConfirmModal() {
        setShowDoubleConfirmModal(false)
        setGroupId('')
    }

    return (
        <div className=" py-6 md:py-0">
            {/* 錯誤彈窗 */}
            {error && <ErrorModal onClose={closeErrorModal} errorMsg={error} />}

            {/* 成功彈窗 */}
            {success && <SuccessModal successMsg={success} />}

            {/* 再次確認彈窗 */}
            {showDoubleConfirmModal && (
                <Modal onClose={() => {}}>
                    <div className="flex w-[300px] flex-col gap-5 px-6">
                        <p className="text-center text-2xl font-bold text-white">
                            再次確認
                        </p>
                        <p className="text-center text-white">是否退出活動？</p>
                        <div className="flex justify-center gap-4">
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="border-gray-5 bg-gray-5 p-2 px-6 text-white hover:bg-gray-5 hover:text-white"
                                onClick={closeDoubleConfirmModal}>
                                <p className="text-sm">取消</p>
                            </Button>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={confirmToLeaveEvent}>
                                <p className="text-sm">確認</p>
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Tabs */}
            <div className="mb-5 flex gap-2">
                <Button
                    className={clsx('', {
                        'bg-primary': status === 'own',
                        'text-black': status === 'own',
                    })}
                    type={'button'}
                    title={'enable'}
                    onClick={() => {
                        changeTabHandler('own')
                    }}>
                    <span className="text-btn2 font-medium tracking-wider">
                        已建立
                    </span>
                </Button>
                <Button
                    className={clsx('', {
                        'bg-primary': status === 'joined',
                        'text-black': status === 'joined',
                    })}
                    type={'button'}
                    title={'enable'}
                    onClick={() => {
                        changeTabHandler('joined')
                    }}>
                    <span className="text-btn2 font-medium tracking-wider">
                        已參加
                    </span>
                </Button>
            </div>

            {/* Events */}
            <div
                className={clsx(
                    'mt-4 md:mt-10',
                    'md:relative md:after:absolute md:after:bottom-0 md:after:z-10 md:after:h-[80px] md:after:w-full md:after:shadow-[inset_0_-35px_30px_-15px_rgba(0,0,0,0.5)] md:after:shadow-gray-1',
                )}>
                <div
                    className={cn(
                        'flex max-h-[1000px] flex-col gap-5 overflow-y-scroll scrollbar-hidden md:pr-10 md:scrollbar md:scrollbar-block',
                        eventList.length > 4 ? 'pb-[600px]' : '',
                    )}>
                    {eventList.length === 0 && (
                        <div className="md:flex md:h-[600px] md:items-center">
                            <EmptyData message="尚無活動" hasButton={false} />
                        </div>
                    )}

                    {eventList.map((item, index) => {
                        return (
                            <div key={index}>
                                {/* 修改活動彈窗 */}
                                {showUpdateModal && (
                                    <UpdateEventModal
                                        existedData={{
                                            title: item?.title,
                                            content: item?.content as string,
                                        }}
                                        updateEvent={updateEventHandler}
                                        onClose={closeUpdateEventModal}
                                    />
                                )}

                                <div className="relative overflow-hidden transition-all duration-500 ease-in-out">
                                    {/* 揪團狀態 */}
                                    {item?.status && (
                                        <div className="absolute right-4 top-4 text-3xl text-white">
                                            <p>
                                                {item?.status === 'ongoing'
                                                    ? '揪團中'
                                                    : '已結束'}
                                            </p>
                                        </div>
                                    )}

                                    <div className="rounded-lg bg-gray-3 p-4 md:px-10 md:py-8">
                                        <div className="md:mb-6 md:flex md:justify-between md:gap-10">
                                            <div className="hidden max-h-[160px] overflow-hidden rounded-lg md:block">
                                                <Image
                                                    src={item?.placeholderImg}
                                                    width={267}
                                                    height={160}
                                                    alt="event image"
                                                    className="rounded-lg bg-gray-5 object-cover"
                                                />
                                            </div>
                                            <div className="mb-6 grow md:m-0">
                                                <div className="mb-6 flex items-center md:mb-8">
                                                    <div>
                                                        <h5 className="mb-2 text-btn2 font-medium text-white md:text-header5 md:leading-120">
                                                            {item?.title}
                                                        </h5>
                                                        <div className="flex gap-1">
                                                            <p className="text-small2 text-white">
                                                                {`<${item?.movieTitle}>`}
                                                            </p>
                                                            <p className="text-small2 text-white">
                                                                {item?.theater}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex border-b border-gray-4 pb-2 md:pb-3">
                                                        <div className="grow space-x-2">
                                                            <span className="text-small2 text-gray-5">
                                                                時間
                                                            </span>
                                                            <span className="text-number5 font-bold leading-120 text-white">
                                                                {formatJoinEventDate(
                                                                    new Date(
                                                                        item?.time,
                                                                    ),
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex pt-2 md:pt-3">
                                                        <div className="grow space-x-2">
                                                            <span className="text-small2 text-gray-5">
                                                                人數
                                                            </span>
                                                            <span className="text-number5 font-bold leading-120 text-white">
                                                                {item?.amount -
                                                                    (item!
                                                                        .vacancy as number)}{' '}
                                                                / {item?.amount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            {/* buttons */}
                                            <div className="mt-6 flex w-full justify-end gap-4 md:m-0">
                                                {status === 'joined' && (
                                                    <Button
                                                        type={'button'}
                                                        title={'詳細'}
                                                        onClick={() => {
                                                            openDoubleConfirmModal(
                                                                item?._id as string,
                                                            )
                                                        }}
                                                        className="w-full border-gray-4 bg-gray-4 py-2 tracking-wider text-gray-5 hover:text-black md:w-auto md:py-3">
                                                        <span className="text-btn2 md:text-btn1">
                                                            退出揪團
                                                        </span>
                                                    </Button>
                                                )}
                                                <Button
                                                    type={'button'}
                                                    title={'詳細'}
                                                    onClick={() => {
                                                        openUpdateEventModal(
                                                            item?._id as string,
                                                        )
                                                    }}
                                                    className="w-full py-2 md:w-auto md:py-3">
                                                    <span className="text-btn2 md:text-btn1">
                                                        編輯
                                                    </span>
                                                </Button>
                                                <Button
                                                    type={'button'}
                                                    title={'詳細'}
                                                    onClick={
                                                        toggleParticipantList
                                                    }
                                                    className="w-full py-2 md:w-auto md:py-3">
                                                    <span className="text-btn2 md:text-btn1">
                                                        查看參加者
                                                    </span>
                                                </Button>
                                                <Button
                                                    type={'button'}
                                                    title={'詳細'}
                                                    onClick={() => {
                                                        // TODO: 聊天室
                                                    }}
                                                    className="w-full bg-primary py-2 text-black hover:bg-primary hover:text-black md:w-auto md:py-3">
                                                    <span className="text-btn2 md:text-btn1">
                                                        揪團聊天
                                                    </span>
                                                </Button>
                                            </div>

                                            {/* 參加者名單 */}
                                            {showParticipants &&
                                                item.participant && (
                                                    <div className="mt-8">
                                                        <div className="flex w-full justify-between rounded-md bg-gray-5 py-1">
                                                            <div className="flex-1 border-r border-r-white text-center text-white">
                                                                姓名
                                                            </div>
                                                            <div className="flex-1 border-r border-r-white text-center text-white">
                                                                暱稱
                                                            </div>
                                                            <div className="flex-1 border-r border-r-white text-center text-white">
                                                                電話
                                                            </div>
                                                            <div className="flex-1 text-center text-white">
                                                                Line ID
                                                            </div>
                                                        </div>

                                                        {item.participant.map(
                                                            (item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex w-full flex-wrap justify-between border-b border-b-gray-5 py-1 text-center text-white">
                                                                    <div className="w-1/4 break-words p-1">
                                                                        {
                                                                            item?.name
                                                                        }
                                                                    </div>
                                                                    <div className="w-1/4 break-words p-1">
                                                                        {
                                                                            item?.nickname
                                                                        }
                                                                    </div>
                                                                    <div className="w-1/4 break-words p-1">
                                                                        {
                                                                            item?.phone
                                                                        }
                                                                    </div>
                                                                    <div className="w-1/4 break-words p-1">
                                                                        {
                                                                            item?.lineId
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Page
