'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Alert as MuiAlert } from '@mui/material'

type AlertContextType = (message: string, severity?: AlertSeverity) => void

type AlertSeverity = 'error' | 'warning' | 'info' | 'success'

interface AlertProviderProps {
    children: ReactNode
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider')
    }
    return context
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<AlertSeverity>('info')

    const showAlert: AlertContextType = (newMessage, newSeverity = 'info') => {
        setMessage(newMessage)
        setSeverity(newSeverity)
        setOpen(true)
    }

    const hideAlert = () => {
        setOpen(false)
    }

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={hideAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert
                    onClose={hideAlert}
                    severity={severity}
                    sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </AlertContext.Provider>
    )
}
