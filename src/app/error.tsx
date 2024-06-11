'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/common'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex h-dvh flex-col items-center justify-center">
            <h2 className="mb-4 text-center text-body text-white">
                Something went wrong!
            </h2>
            <Button type={'button'} title={'Reset'} onClick={() => reset()}>
                再試一次
            </Button>
        </div>
    )
}
