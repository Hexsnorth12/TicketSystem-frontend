'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

import type { DatePickerInput as Props } from '@/types'

const CustomizeDatePickerInput = styled(DatePicker)`
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

const DatePickerInput: React.FC<Props> = ({
    defaultValue,
    dateString,
    onClick,
}) => {
    return (
        <CustomizeDatePickerInput
            open={false}
            defaultValue={defaultValue}
            format={dateString}
            onOpen={onClick}
        />
    )
}

export default DatePickerInput
