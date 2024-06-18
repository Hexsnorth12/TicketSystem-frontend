'use client'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button, DatePicker, ErrorModal, Input } from '@/components/common'
import { MultipleSelect } from '@/components/common'
import FilterOption from '@/components/Join/FilterOption'
import Event from '@/components/Join/Event'
import { SearchBtn } from '@/components/Buttons'
import { checkInvalidTimeRange, cn, exportTimeRangeString } from '@/utils'
import { getJoinEventList, DEFAULTTIMERANGE } from '@/lib/join'
import { useScrollToBottom } from '@/hooks'

import {
    EventList,
    GetEventListRes,
    JoinPageError,
    JoinPageSuccess,
    Tag,
} from '@/types'

const LIMITAMOUNT = 10

const JoinPage = () => {
    const router = useRouter()
    const eventListContainer = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [stopFetching, setStopFetching] = useState(false)
    const [error, setError] = useState('')

    const [eventList, setEventList] = useState<EventList>([])
    const [addMoreSpace, setAddMoreSpace] = useState(false)
    const [timeRange, setTimeRange] = useState(DEFAULTTIMERANGE)

    const [page, setPage] = useState(1)
    const [checkFilter, setCheckFilter] = useState(false)

    const [countries, setCountries] = useState<Tag[]>([])
    const [theaters, setTheaters] = useState<Tag[]>([])
    const [movies, setMovies] = useState<Tag[]>([])

    const [countryTags, setCountryTags] = useState<string[]>([])
    const [theaterTags, setTheaterTags] = useState<string[]>([])
    const [movieTags, setMovieTags] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        // TODO: 做loading spinner
        setIsLoading(true)
        fetchInitData()
    }, [])

    // 拿下一頁資料
    useEffect(() => {
        const notFirstPage = page !== 1
        if (notFirstPage && !stopFetching) {
            if (checkFilter) getFilterEvent(true)
            else fetchInitData()
        }
    }, [page, stopFetching])

    // 篩選條件更新後重新發送拿活動資料
    useEffect(() => {
        try {
            if (checkFilter) {
                const resend = setTimeout(() => {
                    setIsLoading(true)
                    getFilterEvent()
                }, 1200)

                // 防止過多請求發送
                return () => {
                    clearTimeout(resend)
                }
            }
            // eslint-disable-next-line
        } catch (error: any) {
            setError(error.message)
        }
    }, [timeRange, countryTags, theaterTags, movieTags])

    // 拉到活動頁底部觸發callback
    useScrollToBottom(eventListContainer, handleEventScrollToBottom)

    async function fetchInitData() {
        const queryString = {
            page,
            limit: LIMITAMOUNT,
        }
        const result = await getJoinEventList(queryString)
        const isInitRender = page === 1

        postGetEventData(result, isInitRender)
    }

    async function getFilterEvent(scrollBottom = false) {
        const { startDate, endDate, startTime, endTime } = timeRange
        const dateRangeError = startDate > endDate
        const timeRangeError = checkInvalidTimeRange(startTime, endTime)

        if (dateRangeError || timeRangeError) {
            setError('時間範圍有誤')
            return
        }

        const { startAt, endAt } = exportTimeRangeString(timeRange)
        const updatedPage = !scrollBottom ? 1 : page

        // TODO: 待api更新後 更新此邏輯，目前篩選無法運作
        // eslint-disable-next-line
        const movieTitles = () => {}
        // eslint-disable-next-line
        const countries = () => {}

        const params = {
            limit: LIMITAMOUNT,
            page: updatedPage,
            startAt,
            endAt,
            title,
        }

        const result = await getJoinEventList(params)
        postGetEventData(result, !scrollBottom)
    }

    function postGetEventData(result: GetEventListRes, initRender = false) {
        if (result!.status === 'success') {
            const success = result as JoinPageSuccess
            const resEventList = success.events as EventList
            const totalCount = success.totalCount
            const noMoreData =
                resEventList.length === 0 || totalCount <= LIMITAMOUNT

            let updatedEventList = resEventList
            if (!initRender) {
                updatedEventList = [...eventList, ...resEventList] as EventList
            }

            const shouldAddMoreSpace = updatedEventList.length > 6

            if (initRender) setPage(1)
            setStopFetching(noMoreData)
            setEventList(updatedEventList)
            setFilterOptions(updatedEventList)
            setAddMoreSpace(shouldAddMoreSpace)
        } else {
            const error = (result as JoinPageError).error
            setError(error)
        }

        setIsLoading(false)
    }

    function closeErrorModal() {
        setError('')
    }

    function readyToFilter() {
        setCheckFilter(true)
    }

    function changeSearchContent(input: string) {
        setTitle(input)
    }

    function searchTitle() {
        getFilterEvent(false)
    }

    const searchInputOnSubmitHandler: FormEventHandler<HTMLFormElement> = (
        event,
    ) => {
        event.preventDefault()
        searchTitle()
    }

    function handleEventScrollToBottom() {
        if (!stopFetching) {
            setPage((prevState) => {
                return ++prevState
            })
        }
    }

    function openEventModal(id: string) {
        router.push(`joinGroup?groupId=${id}`)
    }

    function openAddEventModal() {
        router.push('createOriganize')
    }

    function setFilterOptions(eventList: EventList) {
        const removeDuplicate: (type: string) => string[] = (type) => [
            ...new Set(eventList.map((e) => e[type])),
        ]

        const movies = removeDuplicate('movieTitle')
        const theaters = removeDuplicate('theater')
        const countries = removeDuplicate('country')

        const setOptionsList: (list: string[]) => Tag[] = (list) =>
            list.map((option) => ({ label: option, value: option }))

        const movieOptions = setOptionsList(movies)
        const theaterOptions = setOptionsList(theaters)
        const countryOptions = setOptionsList(countries)

        setMovies(movieOptions)
        setTheaters(theaterOptions)
        setCountries(countryOptions)
    }

    function updateTimeRange(dateRange: {
        startDate: Date
        endDate: Date
        startTime: Date
        endTime: Date
    }) {
        readyToFilter()
        setTimeRange(dateRange)
    }

    function updateTags(type: string, updatedInfo: string[]) {
        readyToFilter()
        switch (type) {
            case 'country':
                setCountryTags(updatedInfo)
                break
            case 'theater':
                setTheaterTags(updatedInfo)
                break
            case 'movie':
                setMovieTags(updatedInfo)
                break
        }
    }

    return (
        <div className="flex h-screen">
            {/* 錯誤彈窗 */}
            {error && <ErrorModal onClose={closeErrorModal} errorMsg={error} />}

            {/* 篩選列 */}
            <div className="overflow-scroll bg-gray-1 px-6 scrollbar-hidden">
                <div className="py-10">
                    <p className="text-header4 text-white">篩選揪團</p>
                </div>

                <div className="flex flex-col gap-6">
                    <FilterOption
                        title="時間"
                        filter={
                            <DatePicker
                                onError={(error) => setError(error)}
                                setTimeRange={updateTimeRange}
                            />
                        }
                    />
                    <FilterOption
                        title="縣市"
                        filter={
                            <MultipleSelect
                                title="縣市"
                                options={countries}
                                selectedValues={countryTags}
                                onSelectChange={(updatedInfo) =>
                                    updateTags('country', updatedInfo)
                                }
                            />
                        }
                    />
                    <FilterOption
                        title="地點"
                        filter={
                            <MultipleSelect
                                title="地點"
                                options={theaters}
                                selectedValues={theaterTags}
                                onSelectChange={(updatedInfo) =>
                                    updateTags('theater', updatedInfo)
                                }
                            />
                        }
                    />
                    <FilterOption
                        title="電影"
                        filter={
                            <MultipleSelect
                                title="電影"
                                options={movies}
                                selectedValues={movieTags}
                                onSelectChange={(updatedInfo) =>
                                    updateTags('movie', updatedInfo)
                                }
                            />
                        }
                    />
                </div>
                <div className="h-[200px] w-full" />
            </div>

            {/* 活動列 */}
            <div
                ref={eventListContainer}
                className={cn(
                    'flex w-[364px] flex-col gap-10 overflow-scroll px-6 py-10 scrollbar-hidden',
                    addMoreSpace && 'pb-[300px]',
                )}>
                {!isLoading &&
                    eventList.length > 0 &&
                    eventList.map((item, index) => {
                        return (
                            <Event
                                key={index}
                                placeholderImg={item.placeholderImg}
                                title={item.title}
                                movieTitle={item.movieTitle}
                                time={item.time}
                                amount={item.amount}
                                theater={item.theater}
                                onClick={openEventModal.bind(
                                    null,
                                    item._id as string,
                                )}
                            />
                        )
                    })}
            </div>

            {/* 地圖 */}
            <div className="relative flex-1 bg-white">
                {/* 搜尋欄 */}
                <form onSubmit={searchInputOnSubmitHandler}>
                    <div className="absolute left-6 top-6 inline-block">
                        <div className="relative shadow-sm">
                            <Input
                                type="text"
                                rounded="none"
                                value={title}
                                onChange={changeSearchContent}
                                placeholder="輸入活動名稱"
                                className="h-16 w-screen py-5 md:h-16 md:w-[416px] md:rounded-full"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                <SearchBtn
                                    type="search"
                                    active={true}
                                    onClick={searchTitle}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                {/* 地圖 */}
                <Image
                    src="/icons/join/dummy_map_should_be_deleted.png"
                    alt="dummy map"
                    width={1500}
                    height={1000}
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
                    onClick={openAddEventModal}
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
