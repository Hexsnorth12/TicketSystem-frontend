'use client'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps'
import { format, endOfMonth } from 'date-fns'

import { Button, DatePicker, ErrorModal, Input } from '@/components/common'
import { MultipleSelect } from '@/components/common'
import FilterOption from '@/components/Join/FilterOption'
import Event from '@/components/Join/Event'
import { SearchBtn } from '@/components/Buttons'
import DatePickerModal from '@/components/common/DatePicker/DatePickerModal'
import { checkInvalidTimeRange, cn } from '@/utils'
import { datePickerStaticData } from '@/lib'
import { getJoinEventList, DEFAULTTIMERANGE } from '@/lib/join'
import { useScrollToBottom } from '@/hooks'

import { MOVIES, THEATERS, COUNTRIES } from '@/definitions'
import {
    EventList,
    GetEventListRes,
    GetEventParams,
    JoinPageError,
    JoinPageSuccess,
} from '@/types'

const { DEFAULTDATE, STARTDATETITLE, ENDDATETITLE } = datePickerStaticData

const LIMITAMOUNT = 10
const MOBILE_FILTER_LIST = ['時間', '縣市', '地點', '電影']

//TODO: 程式碼優化：模組化
const JoinPage = () => {
    const router = useRouter()
    const eventListContainer = useRef<HTMLDivElement>(null)
    const [mapKey, setMapKey] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [stopFetching, setStopFetching] = useState(false)
    const [error, setError] = useState('')

    const [eventList, setEventList] = useState<EventList>([])
    const [addMoreSpace, setAddMoreSpace] = useState(false)
    const [timeRange, setTimeRange] = useState(DEFAULTTIMERANGE)

    const [page, setPage] = useState(1)
    const [checkFilter, setCheckFilter] = useState(false)
    const [noEvent, setNoEvent] = useState(false)
    const [onSearchInput, setOnSearchInput] = useState(false)

    const [countryTag, setCountryTag] = useState<string>('')
    const [theaterTags, setTheaterTags] = useState<string[]>([])
    const [movieTags, setMovieTags] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')

    const [showInfoWindow, setShowInfoWindow] = useState(false)
    const [showMobileStartDateModal, setShowMobileStartDateModal] =
        useState(false)
    const [showMobileEndDateModal, setShowMobileEndDateModal] = useState(false)

    const [mobileSelectedFilterIndex, setMobileSelectedFilterIndex] = useState<
        number | null
    >(null)

    useEffect(() => {
        setIsLoading(true)
        getAllEvents()
    }, [])

    useEffect(() => {
        setTheaterTags([])
    }, [countryTag])

    // 拿下一頁資料
    useEffect(() => {
        const notFirstPage = page !== 1
        if (notFirstPage && !stopFetching) {
            if (checkFilter) getFilterEvents(true)
            else getAllEvents()
        }
    }, [page, stopFetching])

    // 篩選條件更新後重新發送拿活動資料
    useEffect(() => {
        try {
            if (checkFilter) {
                setIsLoading(true)
                const resend = setTimeout(() => {
                    getFilterEvents()
                }, 1200)

                // 防止過多請求發送
                return () => {
                    clearTimeout(resend)
                }
            }
            // eslint-disable-next-line
        } catch (error: any) {
            setError(error.message)
            setIsLoading(false)
        }
    }, [timeRange, theaterTags, movieTags])

    // 拉到活動頁底部觸發callback
    useScrollToBottom(eventListContainer, handleEventScrollToBottom)

    // 拿所有活動，無篩選
    async function getAllEvents() {
        setNoEvent(false)
        const { startDate, endDate, startTime, endTime } = timeRange

        const queryString = {
            page,
            limit: LIMITAMOUNT,
            startAt: format(startDate, 'yyyy/MM/dd'),
            endAt: format(endDate, 'yyyy/MM/dd'),
            timeBegin: format(startTime, 'HH:mm'),
            timeEnd: format(endTime, 'HH:mm'),
        }
        const result = await getJoinEventList(queryString)
        const isInitRender = page === 1

        postGetEventData(result, isInitRender)
    }

    // 拿篩選後活動
    async function getFilterEvents(scrollBottom = false) {
        setNoEvent(false)

        const { startDate, endDate, startTime, endTime } = timeRange
        const dateRangeError = startDate > endDate
        const timeRangeError = checkInvalidTimeRange(startTime, endTime)

        if (dateRangeError || timeRangeError) {
            setError('時間範圍有誤')
            setIsLoading(false)
            return
        }

        const dateRangeObj = {
            startAt: format(startDate, 'yyyy/MM/dd'),
            endAt: format(endDate, 'yyyy/MM/dd'),
            timeBegin: format(startTime, 'HH:mm'),
            timeEnd: format(endTime, 'HH:mm'),
        }

        const updatedPage = !scrollBottom ? 1 : page
        const theaters = theaterTags.join(',')
        const movieTitles = movieTags.join(',')
        const eventTitle = title

        let params: GetEventParams = {
            limit: LIMITAMOUNT,
            page: updatedPage,
            title: eventTitle,
            movieTitle: movieTitles,
            theater: theaters,
            ...dateRangeObj,
        }

        // 如果是活動標題搜尋，則無其他參數限制
        if (onSearchInput) {
            params = {
                limit: LIMITAMOUNT,
                page: updatedPage,
                title: eventTitle,
            }
        }

        const result = await getJoinEventList(params)
        postGetEventData(result, !scrollBottom)
    }

    function postGetEventData(result: GetEventListRes, initRender = false) {
        if (result!.status === 'success') {
            const success = result as JoinPageSuccess
            const resEventList = success.events as EventList
            const totalCount = success.totalCount
            const hasNoEvent = resEventList.length === 0
            const noMoreData = hasNoEvent || totalCount <= LIMITAMOUNT

            let totalEvents = resEventList
            if (!initRender) {
                totalEvents = [...eventList, ...resEventList] as EventList
            }

            const filteredCountryEvents = []
            if (countryTag) {
                const rangedTheaters = THEATERS[Number(countryTag)]
                const theaterName = rangedTheaters.map((t) => t.label)
                for (const event of totalEvents) {
                    if (theaterName.includes(event?.theater))
                        filteredCountryEvents.push(event)
                }
            }

            // 有點選縣市的話，只會顯示該縣市活動
            const updatedEventList = countryTag
                ? filteredCountryEvents
                : totalEvents
            const shouldAddMoreSpace = updatedEventList.length > 4

            if (initRender) setPage(1)
            if ((initRender && hasNoEvent) || !updatedEventList.length)
                setNoEvent(true)
            setStopFetching(noMoreData)
            setEventList(updatedEventList)
            setAddMoreSpace(shouldAddMoreSpace)
        } else {
            const error = (result as JoinPageError).error
            setError(error)
            setNoEvent(true)
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
        setIsLoading(true)
        getFilterEvents(false)
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

    function focusSearchInput(isFocus: boolean) {
        setOnSearchInput(isFocus)
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
        const updatedValue = updatedInfo.length ? updatedInfo[0] : ''
        switch (type) {
            case 'country':
                if (!(Number(updatedValue) === Number(countryTag[0]))) {
                    setMapKey(Number(updatedValue))
                }
                setCountryTag(updatedValue)
                break
            case 'theater':
                setTheaterTags(updatedInfo)
                break
            case 'movie':
                setMovieTags(updatedInfo)
                break
        }
    }

    function clickMarkerHandler(theater: string) {
        setIsLoading(true)
        updateTags('theater', [theater])
    }

    function mobileFilterSelectHandler(isSelected: boolean, index: number) {
        if (isSelected) setMobileSelectedFilterIndex(null)
        else setMobileSelectedFilterIndex(index)
    }

    function mobileFilterHandler(index: number, isSelected: boolean) {
        if (index === 0) toggleMobileStartDateModal(true)
        else mobileFilterSelectHandler(isSelected, index)
    }

    function toggleMobileStartDateModal(show: boolean) {
        setShowMobileStartDateModal(show)
    }

    function toggleMobileEndDateModal(show: boolean) {
        setShowMobileEndDateModal(show)
    }

    function mobileChangeStartDate(date: Date) {
        updateTimeRange({ ...timeRange, startDate: date })
        toggleMobileEndDateModal(true)
    }

    function mobileChangeEndDate(date: Date) {
        if (timeRange.startDate > date) {
            setError('結束日期不可早於開始日期')
            toggleMobileEndDateModal(false)
            return
        }
        updateTimeRange({ ...timeRange, endDate: date })
    }

    return (
        <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <div className="relative h-screen md:flex">
                {/* mobile search bar & filter inputs */}
                <div className="absolute top-[-6px] z-10 max-w-full overflow-hidden md:hidden">
                    <div className="relative">
                        <form onSubmit={searchInputOnSubmitHandler}>
                            <Input
                                type="text"
                                rounded="none"
                                value={title}
                                onChange={changeSearchContent}
                                placeholder="輸入活動名稱"
                                className="w-screen py-3"
                                onFocus={() => focusSearchInput(true)}
                                onBlur={() => focusSearchInput(false)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                <SearchBtn
                                    type="search"
                                    active={true}
                                    onClick={searchTitle}
                                    iconDimension={{ width: 16, height: 16 }}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="flex gap-[10px] border-b border-t border-gray-3 bg-gray-2 px-3 md:hidden">
                        {MOBILE_FILTER_LIST.map((filter, index) => {
                            const isSelected =
                                mobileSelectedFilterIndex === index
                            return (
                                <>
                                    <button
                                        key={index}
                                        onClick={() => {
                                            mobileFilterHandler(
                                                index,
                                                isSelected,
                                            )
                                        }}
                                        className="flex items-center justify-center py-3 text-small2">
                                        <div
                                            className={cn(
                                                'text-white',
                                                isSelected && 'text-primary',
                                            )}>
                                            {filter}
                                        </div>
                                        {isSelected ? (
                                            <Image
                                                src={
                                                    '/icons/join/icon_arrow_up_light.png'
                                                }
                                                alt="arrow down highlight"
                                                width={16}
                                                height={16}
                                            />
                                        ) : (
                                            <Image
                                                src={
                                                    '/icons/join/icon_arrow_down.png'
                                                }
                                                alt="arrow down"
                                                width={16}
                                                height={16}
                                            />
                                        )}
                                    </button>

                                    {index === 0 && (
                                        <>
                                            {/* 開始日期彈窗 */}
                                            <DatePickerModal
                                                visible={
                                                    showMobileStartDateModal
                                                }
                                                title={STARTDATETITLE}
                                                value={new Date()}
                                                defaultValue={DEFAULTDATE}
                                                onChange={mobileChangeStartDate}
                                                onClose={toggleMobileStartDateModal.bind(
                                                    null,
                                                    false,
                                                )}
                                                containerStyle="max-w-[400px]"
                                            />
                                            {/* 結束日期彈窗 */}
                                            <DatePickerModal
                                                visible={showMobileEndDateModal}
                                                title={ENDDATETITLE}
                                                value={new Date()}
                                                defaultValue={DEFAULTDATE}
                                                onChange={mobileChangeEndDate}
                                                onClose={toggleMobileEndDateModal.bind(
                                                    null,
                                                    false,
                                                )}
                                                containerStyle="max-w-[400px]"
                                            />
                                        </>
                                    )}
                                </>
                            )
                        })}
                    </div>

                    {!!mobileSelectedFilterIndex && (
                        <div className="min-w-full overflow-x-auto bg-gray-1 p-4 scrollbar-hidden md:hidden">
                            {mobileSelectedFilterIndex === 1 && (
                                <MultipleSelect
                                    single
                                    title="縣市"
                                    options={COUNTRIES}
                                    selectedValues={[countryTag]}
                                    onSelectChange={(updatedInfo) =>
                                        updateTags('country', updatedInfo)
                                    }
                                    hideBorder
                                    containerStyle="p-0"
                                    checkboxStyle="min-w-[90px]"
                                />
                            )}
                            {mobileSelectedFilterIndex === 2 && (
                                <MultipleSelect
                                    title="地點"
                                    options={THEATERS[Number(countryTag)]}
                                    selectedValues={theaterTags}
                                    onSelectChange={(updatedInfo) =>
                                        updateTags('theater', updatedInfo)
                                    }
                                    hideBorder
                                    containerStyle="p-0"
                                    checkboxStyle="min-w-[150px]"
                                />
                            )}
                            {mobileSelectedFilterIndex === 3 && (
                                <MultipleSelect
                                    title="電影"
                                    options={MOVIES}
                                    selectedValues={movieTags}
                                    onSelectChange={(updatedInfo) =>
                                        updateTags('movie', updatedInfo)
                                    }
                                    hideBorder
                                    containerStyle="p-0"
                                    checkboxStyle="min-w-[150px]"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* desktop */}
                {/* 錯誤彈窗 */}
                {error && (
                    <ErrorModal onClose={closeErrorModal} errorMsg={error} />
                )}

                {/* 篩選列 */}
                <div className="hidden overflow-scroll bg-gray-1 px-6 scrollbar-hidden md:block">
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
                                    defaultDateRange={{
                                        endDate: endOfMonth(new Date()),
                                    }}
                                />
                            }
                        />
                        <FilterOption
                            title="縣市"
                            filter={
                                <MultipleSelect
                                    single
                                    title="縣市"
                                    options={COUNTRIES}
                                    selectedValues={[countryTag]}
                                    onSelectChange={(updatedInfo) =>
                                        updateTags('country', updatedInfo)
                                    }
                                    defaultValue="台北市"
                                />
                            }
                        />
                        {typeof Number(countryTag) === 'number' && (
                            <FilterOption
                                title="地點"
                                filter={
                                    <MultipleSelect
                                        title="地點"
                                        options={THEATERS[Number(countryTag)]}
                                        selectedValues={theaterTags}
                                        onSelectChange={(updatedInfo) =>
                                            updateTags('theater', updatedInfo)
                                        }
                                    />
                                }
                            />
                        )}
                        <FilterOption
                            title="電影"
                            filter={
                                <MultipleSelect
                                    title="電影"
                                    options={MOVIES}
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
                        'hidden w-[364px] flex-col gap-10 overflow-scroll px-6 py-10 scrollbar-hidden md:flex',
                        addMoreSpace && 'pb-[300px]',
                    )}>
                    {isLoading && (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <div className="flex items-center justify-center">
                                <div className="h-16 w-16 animate-spin rounded-full border-[5px] border-b-transparent border-l-primary border-r-primary border-t-primary"></div>
                            </div>
                        </div>
                    )}
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
                    {!isLoading && noEvent && (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                            <div className="text-header5 text-gray-3">
                                查無活動
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative h-full bg-white md:flex-1">
                    {/* 搜尋欄 */}
                    <div className="absolute left-6 top-6 z-50 hidden md:inline-block">
                        <form onSubmit={searchInputOnSubmitHandler}>
                            {/* <div className="absolute left-6 top-6 inline-block"> */}
                            <div className="relative shadow-sm">
                                <Input
                                    type="text"
                                    rounded="none"
                                    value={title}
                                    onChange={changeSearchContent}
                                    placeholder="輸入活動名稱"
                                    className="h-16 w-screen py-5 md:h-16 md:w-[416px] md:rounded-full"
                                    onFocus={() => focusSearchInput(true)}
                                    onBlur={() => focusSearchInput(false)}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                    <SearchBtn
                                        type="search"
                                        active={true}
                                        onClick={searchTitle}
                                    />
                                </div>
                            </div>
                            {/* </div> */}
                        </form>
                    </div>

                    {/* desktop & mobile */}
                    {/* 地圖 */}
                    <div className="h-full w-full md:block">
                        <Map
                            //變更key來reload map，來重新定位defaulCenter
                            key={mapKey}
                            style={{ width: '100%', height: '100%' }}
                            defaultCenter={{
                                lat: COUNTRIES[Number(countryTag)]
                                    .defaultPosition?.lat as number,
                                lng: COUNTRIES[Number(countryTag)]
                                    .defaultPosition?.lng as number,
                            }}
                            defaultZoom={13}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}>
                            {THEATERS[Number(countryTag)].map(
                                (theater, index) => {
                                    return (
                                        <>
                                            <Marker
                                                key={index}
                                                onClick={() => {
                                                    clickMarkerHandler(
                                                        theater.label,
                                                    )
                                                }}
                                                onMouseOver={() => {
                                                    setShowInfoWindow(true)
                                                }}
                                                onMouseOut={() => {
                                                    setShowInfoWindow(false)
                                                }}
                                                position={{
                                                    lat: theater.position[0],
                                                    lng: theater.position[1],
                                                }}
                                            />
                                            {showInfoWindow && (
                                                <InfoWindow
                                                    position={{
                                                        lat: theater
                                                            .position[0],
                                                        lng: theater
                                                            .position[1],
                                                    }}
                                                    pixelOffset={[0, -36]}
                                                    disableAutoPan
                                                    headerDisabled>
                                                    <p className="text-small1 text-gray-2">
                                                        {theater.label}
                                                    </p>
                                                </InfoWindow>
                                            )}
                                        </>
                                    )
                                },
                            )}
                        </Map>

                        {/* mobile event list & add join event button*/}
                        <div className="absolute bottom-[33%] right-3 md:hidden ">
                            <Button
                                type="button"
                                title="create join button"
                                onClick={openAddEventModal}
                                className="rounded-full bg-black p-3 hover:bg-black">
                                <Image
                                    src="/icons/join/icon_add_join.png"
                                    alt="Add Join event button"
                                    width={16}
                                    height={16}
                                />
                            </Button>
                        </div>
                        {isLoading && (
                            <div className="absolute bottom-[15%] flex h-[100px] w-full items-start justify-center md:hidden">
                                <div className="flex items-center justify-center">
                                    <div className="h-10 w-10 animate-spin rounded-full border-[5px] border-b-transparent border-l-gray-4 border-r-gray-4 border-t-gray-4"></div>
                                </div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="absolute bottom-[15%] flex w-full gap-3 overflow-x-scroll pl-3 pr-[100px] scrollbar-hidden md:hidden">
                                {eventList.length > 0 &&
                                    eventList.map((item, index) => {
                                        return (
                                            <Event
                                                key={index}
                                                placeholderImg={
                                                    item.placeholderImg
                                                }
                                                title={item.title}
                                                movieTitle={item.movieTitle}
                                                time={item.time}
                                                amount={item.amount}
                                                theater={item.theater}
                                                onClick={openEventModal.bind(
                                                    null,
                                                    item._id as string,
                                                )}
                                                containerStyle={
                                                    'bg-gray-2 p-3 rounded-lg'
                                                }
                                            />
                                        )
                                    })}
                            </div>
                        )}
                    </div>

                    {/* 新增活動按鈕 */}
                    <div className="absolute bottom-6 right-6 hidden md:block ">
                        <Button
                            type="button"
                            title="create join button"
                            onClick={openAddEventModal}
                            className="rounded-full bg-black p-5 hover:bg-black">
                            <Image
                                src="/icons/join/icon_add_join.png"
                                alt="Add Join event button"
                                width={18}
                                height={18}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </APIProvider>
    )
}

export default JoinPage
