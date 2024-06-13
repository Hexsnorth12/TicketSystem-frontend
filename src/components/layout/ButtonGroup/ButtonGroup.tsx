'use client'

import React from 'react'
import clsx from 'clsx'
import { Button } from '@/components/common'
import { useRouter, useSearchParams } from 'next/navigation'

interface ButtonGroupProps {
}

const ButtonGroup: React.FC<ButtonGroupProps> = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const status = searchParams.get('status') || 'unverified'
    return (
        <>
            <Button
                className={clsx('', {
                    'bg-primary': status === 'unverified',
                })}
                type={'button'}
                title={'enable'}
                onClick={() => {
                    router.push('/user/tickets?status=unverified')
                }}>
                <span className="text-btn2 font-medium tracking-wider">
                    可使用
                </span>
            </Button>
            <Button
                className={clsx('', {
                    'bg-primary': status === 'expired',
                })}
                type={'button'}
                title={'enable'}
                onClick={() => {
                    router.push('/user/tickets?status=expired')
                }}>
                <span className="text-btn2 font-medium tracking-wider">
                    已失效
                </span>
            </Button>
            <Button
                className={clsx('', {
                    'bg-primary': status === 'refunded',
                })}
                type={'button'}
                title={'enable'}
                onClick={() => {
                    router.push('/user/tickets?status=refunded')
                }}>
                <span className="text-btn2 font-medium tracking-wider">
                    已退票
                </span>
            </Button>
        </>
    )
}

export default ButtonGroup
