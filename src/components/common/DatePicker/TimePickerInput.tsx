'use client'
import React from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

import type { TimePickerInput as Props } from '@/types'

const CustomizeTimePickerInput = styled(TimePicker)`
    .MuiInputBase-input {
        order: 1;
        color: #fff;
        font-weight: normal;
        align-self: center;
        padding: 16px 0px 16px 16px;
    }
    .MuiInputAdornment-root {
        order: 0;
    }
    .MuiSvgIcon-root {
        color: #4e4e4e;
    }
    & .MuiOutlinedInput-notchedOutline,
    &:hover .MuiOutlinedInput-notchedOutline {
        border-color: transparent;
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
            onAccept={(value) => {
                if (value) onChange(value)
            }}
        />
    )
}

export default TimePickerInput
