'use client'
import React, { useState } from 'react'

import DatePickerModal from './DatePickerModal'
import DatePickerInput from './DatePickerInput'
import TimePickerInput from './TimePickerInput'

import { datePickerStaticData } from '@/lib'
import { formatDateString, formatTimeString } from '@/utils'

const { DEFAULTDATE, STARTDATETITLE, ENDDATETITLE } = datePickerStaticData

const DatePicker: React.FC = () => {
    const [renderStartDateModal, setRenderStartDateModal] = useState(false)
    const [renderEndDateModal, setRenderEndDateModal] = useState(false)

    const [startDate, setStartDate] = useState(DEFAULTDATE)
    const [endDate, setEndDate] = useState(DEFAULTDATE)
    const [startTime, setStartTime] = useState(DEFAULTDATE)
    const [endTime, setEndTime] = useState(DEFAULTDATE)

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

    // TODO: 待新增 判斷日期順序邏輯
    function changeStartDate(date: Date) {
        setStartDate(date)
    }
    function changeEndDate(date: Date) {
        setEndDate(date)
    }

    // TODO: 待新增 判斷時間順序邏輯
    function setStartTimeHandler(date: Date) {
        setStartTime(date)
    }
    function setEndTimeHandler(date: Date) {
        setEndTime(date)
    }

    return (
        <div>
            <div className="gap flex w-[316px] flex-col gap-3">
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
