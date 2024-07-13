'use client'
import React from 'react'
import { Checkbox } from '@/components/common'
import { cn } from '@/utils'

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
    hideBorder?: boolean
    containerStyle?: string
    checkboxStyle?: string
}

const MultipleSelect: React.FC<Props> = ({
    single = false,
    title,
    options,
    selectedValues,
    onSelectChange,
    defaultValue = '',
    hideBorder = false,
    containerStyle = null,
    checkboxStyle = null,
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
            <div
                className={cn(
                    'flex flex-row rounded-lg p-4 md:flex-col',
                    !hideBorder && 'border border-gray-3',
                    containerStyle && containerStyle,
                )}>
                {options.map(({ label, value }) => (
                    <Checkbox
                        key={label}
                        label={label}
                        checked={selectedValues.includes(value)}
                        onChange={() => {
                            handleChange(value)
                        }}
                        defaultChecked={defaultValue === label}
                        checkboxStyle={checkboxStyle}
                    />
                ))}
            </div>
        </div>
    )
}

export default MultipleSelect
