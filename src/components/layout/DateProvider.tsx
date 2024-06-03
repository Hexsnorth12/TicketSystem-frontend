'use client'

import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3'
import React, { PropsWithChildren } from 'react'

export default function DateProvider({ children }: PropsWithChildren) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
        </LocalizationProvider>
    )
}
