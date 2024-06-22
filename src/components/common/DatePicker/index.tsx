'use client'
import React, { useEffect, useState } from 'react'

import DatePickerModal from './DatePickerModal'
import DatePickerInput from './DatePickerInput'
import TimePickerInput from './TimePickerInput'
import { datePickerStaticData } from '@/lib'
import { formatDateString, formatTimeString } from '@/utils'

import type { DatePickerComponent as Props } from '@/types'

const {
    DEFAULTDATE,
    DEFAULTENDDATE,
    DEFAULTSTARTTIME,
    DEFAULTENDTIME,
    STARTDATETITLE,
    ENDDATETITLE,
} = datePickerStaticData

const DatePicker: React.FC<Props> = ({ onError, setTimeRange }) => {
    const [renderStartDateModal, setRenderStartDateModal] = useState(false)
    const [renderEndDateModal, setRenderEndDateModal] = useState(false)

    const [startFilter, setStartFilter] = useState(false)

    const [startDate, setStartDate] = useState(DEFAULTDATE)
    const [endDate, setEndDate] = useState(DEFAULTENDDATE)
    const [startTime, setStartTime] = useState(DEFAULTSTARTTIME)
    const [endTime, setEndTime] = useState(DEFAULTENDTIME)

    const startDateString = formatDateString(startDate)
    const endDateString = formatDateString(endDate)
    const startTimeString = formatTimeString(startTime)
    const endTimeString = formatTimeString(endTime)

    function toggleStartDateModalHandler(show: boolean) {
        setRenderStartDateModal(show)
    }
    function toggleEndDateModalHandler(show: boolean) {
        setRenderEndDateModal(show)
    }

    function filterActivated() {
        setStartFilter(true)
    }

    function changeStartDate(date: Date) {
        filterActivated()
        setStartDate(date)
        toggleEndDateModalHandler(true)
    }
    function changeEndDate(date: Date) {
        filterActivated()
        if (startDate > date) {
            onError('結束日期不可早於開始日期')
            return
        }
        setEndDate(date)
    }

    function setStartTimeHandler(date: Date) {
        filterActivated()
        setStartTime(
            new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
                date.getHours(),
                date.getMinutes(),
            ),
        )
    }
    function setEndTimeHandler(date: Date) {
        filterActivated()
        // TODO: api篩選需要更新
        const endTime = new Date(
            startTime.getFullYear(),
            startTime.getMonth(),
            startTime.getDate(),
            date.getHours(),
            date.getMinutes(),
        )
        if (startTime > endTime) {
            onError('結束時間不可早於開始時間')
            return
        }
        setEndTime(
            new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate(),
                date.getHours(),
                date.getMinutes(),
            ),
        )
    }

    useEffect(() => {
        if (startFilter) {
            setTimeRange({
                startDate,
                endDate,
                startTime,
                endTime,
            })
        }
    }, [startDate, endDate, startTime, endTime])

    return (
        <div>
            <div className="gap flex w-[316px] flex-col gap-3 overflow-hidden rounded-lg border border-gray-3">
                <div className="flex">
                    {/* 開始日期 */}
                    <DatePickerInput
                        defaultValue={DEFAULTDATE}
                        dateString={startDateString}
                        onClick={toggleStartDateModalHandler.bind(null, true)}
                    />

                    <div className="self-center text-2xl text-gray-5"> ~ </div>

                    {/* 結束日期 */}
                    <DatePickerInput
                        defaultValue={DEFAULTDATE}
                        dateString={endDateString}
                        onClick={toggleEndDateModalHandler.bind(null, true)}
                    />
                </div>

                <div className="flex">
                    {/* 開始時間 */}
                    <TimePickerInput
                        defaultValue={DEFAULTDATE}
                        timeString={startTimeString}
                        onChange={setStartTimeHandler}
                    />

                    <div className="self-center text-2xl text-gray-5"> ~ </div>

                    {/* 結束時間 */}
                    <TimePickerInput
                        defaultValue={DEFAULTDATE}
                        timeString={endTimeString}
                        onChange={setEndTimeHandler}
                    />
                </div>
            </div>

            {/* 開始日期彈窗 */}
            <DatePickerModal
                visible={renderStartDateModal}
                title={STARTDATETITLE}
                value={startDate}
                defaultValue={DEFAULTDATE}
                onChange={changeStartDate}
                onClose={toggleStartDateModalHandler.bind(null, false)}
            />
            {/* 結束日期彈窗 */}
            <DatePickerModal
                visible={renderEndDateModal}
                title={ENDDATETITLE}
                value={endDate}
                defaultValue={DEFAULTDATE}
                onChange={changeEndDate}
                onClose={toggleEndDateModalHandler.bind(null, false)}
            />
        </div>
    )
}

export default DatePicker
