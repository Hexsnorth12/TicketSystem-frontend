'use client'

import React from 'react'
import { Button } from '@/components/common'

interface ButtonGroupProps {}

const ButtonGroup: React.FC<ButtonGroupProps> = () => {
    return (
        <>
            <Button type={'button'} title={'enable'} onClick={() => {}}>
                <span className="text-btn2 font-medium tracking-wider">
                    可使用
                </span>
            </Button>
            <Button type={'button'} title={'enable'} onClick={() => {}}>
                <span className="text-btn2 font-medium tracking-wider">
                    已失效
                </span>
            </Button>
            <Button type={'button'} title={'enable'} onClick={() => {}}>
                <span className="text-btn2 font-medium tracking-wider">
                    已退票
                </span>
            </Button>
        </>
    )
}

export default ButtonGroup
