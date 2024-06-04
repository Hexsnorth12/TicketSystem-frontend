'use client'
import React from 'react'
import { Checkbox } from '@/components/common'

interface Props {
    title: string
    options: {
        label: string
        value: string
    }[]
    selectedValues: string[]
    onSelectChange: (currentValues: string[]) => void
}

const MultipleSelect: React.FC<Props> = ({
    title,
    options,
    selectedValues,
    onSelectChange,
}) => {
    const handleChange = (value: string) => {
        if (selectedValues.includes(value)) {
            const newValues = selectedValues.filter((v) => v !== value)
            onSelectChange(newValues)
        } else {
            const newValues = [...selectedValues, value]
            onSelectChange(newValues)
        }
    }
    return (
        <div>
            <h5 className="mb-3 text-small1 text-white">{title}</h5>
            <div className="flex flex-col rounded-lg border border-gray-3 p-4">
                {options.map(({ label, value }) => (
                    <Checkbox
                        key={label}
                        label={label}
                        checked={selectedValues.includes(value)}
                        onChange={() => {
                            handleChange(value)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default MultipleSelect
