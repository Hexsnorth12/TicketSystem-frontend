'use client'
import React from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

import type { DatePickerInput as Props } from '@/types'

const CustomizeDatePickerInput = styled(DatePicker)`
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
    & .MuiOutlinedInput-notchedOutline {
        border-color: transparent;
    }
    &:hover .MuiOutlinedInput-notchedOutline {
        border-color: transparent;
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
