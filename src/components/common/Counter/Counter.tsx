'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import minus from '@icon/minus_light.svg'
import add from '@icon/add_light.svg'

interface CounterProps {
    onValueChange: (value: number) => void
    initialValue?: number
    minValue?: number
    maxValue: number
}

const Counter: React.FC<CounterProps> = ({
    onValueChange,
    initialValue = 1,
    minValue = 1,
    maxValue = 999,
}) => {
    const [value, setValue] = useState(initialValue)

    const handleDecrement = () => {
        if (value > minValue) {
            const newValue = value - 1
            setValue(newValue)
            onValueChange(newValue)
        }
    }

    const handleIncrement = () => {
        if (value < maxValue) {
            const newValue = value + 1
            setValue(newValue)
            onValueChange(newValue)
        }
    }

    return (
        <div className="flex w-full justify-between space-x-[44px] rounded-lg border border-gray-4 px-2 py-4 md:w-auto md:py-2.5 ">
            <button onClick={handleDecrement}>
                <Image
                    src={minus}
                    width={16}
                    height={16}
                    alt={'minus amount of product'}
                    className="md:h-6 md:w-6"
                />
            </button>
            <p className="min-w-[2em] text-center text-number5 leading-120 text-white md:text-number4">
                {value}
            </p>
            <button onClick={handleIncrement}>
                <Image
                    src={add}
                    width={16}
                    height={16}
                    alt={'add amount of product'}
                    className="md:h-6 md:w-6"
                />
            </button>
        </div>
    )
}

export default Counter
