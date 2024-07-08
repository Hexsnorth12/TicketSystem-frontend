'use client'
import React from 'react'
import { Checkbox } from '@/components/common'

interface Props {
    single?: boolean
    title: string
    options: {
        label: string
        value: string
    }[]
    selectedValues: string[]
    onSelectChange: (currentValues: string[]) => void
    defaultValue?: string
}

const MultipleSelect: React.FC<Props> = ({
    single = false,
    title,
    options,
    selectedValues,
    onSelectChange,
    defaultValue = '',
}) => {
    const handleChange = (value: string) => {
        if (selectedValues.includes(value)) {
            const newValues = single
                ? []
                : selectedValues.filter((v) => v !== value)
            onSelectChange(newValues)
        } else {
            const newValues = single ? [value] : [...selectedValues, value]
            onSelectChange(newValues)
        }
    }
    return (
        <div>
            <h5 className="mb-3 hidden text-small1 text-white">{title}</h5>
            <div className="flex flex-row rounded-lg border border-gray-3 p-4 md:flex-col">
                {options.map(({ label, value }) => (
                    <Checkbox
                        key={label}
                        label={label}
                        checked={selectedValues.includes(value)}
                        onChange={() => {
                            handleChange(value)
                        }}
                        defaultChecked={defaultValue === label}
                    />
                ))}
            </div>
        </div>
    )
}

export default MultipleSelect
