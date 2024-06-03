'use client'
import React from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

import type { TimePickerInput as Props } from '@/types'

const CustomizeTimePickerInput = styled(TimePicker)`
    .MuiInputBase-input {
        color: #fff;
        font-weight: normal;
        align-self: center;
        padding: 16px 0px 16px 16px;
    }
    .MuiSvgIcon-root {
        color: #4e4e4e;
    }
`

const TimePickerInput: React.FC<Props> = ({
    defaultValue,
    timeString,
    onChange,
}) => {
    return (
        <CustomizeTimePickerInput
            views={['hours', 'minutes']}
            defaultValue={defaultValue}
            format={timeString}
            onChange={(value) => {
                if (value) onChange(value)
            }}
        />
    )
}

export default TimePickerInput
