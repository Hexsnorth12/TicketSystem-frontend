'use client'
import React from 'react'
import { DateCalendar } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

import { Modal } from '..'
import { CloseBtn } from '@/components/Buttons'

import type { DatePickerModal as Props } from '@/types'

const LASTDAY = new Date(new Date().getFullYear(), 11, 31)

const CustomizeDateCalendar = styled(DateCalendar)`
    color: #fff;

    .MuiSvgIcon-root,
    .MuiDayCalendar-weekDayLabel,
    .MuiPickersDay-root {
        color: #fff;
    }
`

const DatePickerModal: React.FC<Props> = ({
    visible,
    value,
    defaultValue,
    title,
    onClose,
    onChange,
}) => {
    function onChangeHandler(value: Date) {
        onChange(value)
        onClose()
    }

    return visible ? (
        <Modal onClose={() => {}}>
            <div className="container relative overflow-y-scroll rounded-lg bg-gray-2 px-3 py-6 scrollbar-hidden md:p-10">
                {title && (
                    <h3 className="mb-6 text-center text-header5 text-white md:mb-5 md:text-header4">
                        {title}
                    </h3>
                )}
                <div
                    className="absolute right-[10px] top-[10px] cursor-pointer"
                    onClick={onClose}>
                    <CloseBtn />
                </div>
                <CustomizeDateCalendar
                    onChange={(value) => onChangeHandler(value)}
                    value={value}
                    defaultValue={defaultValue}
                    disablePast
                    maxDate={LASTDAY}
                    views={['day', 'month']}
                />
            </div>
        </Modal>
    ) : null
}

export default DatePickerModal
