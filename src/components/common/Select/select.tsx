'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

interface SelectProps {
    placeholder?: string
    label: string
    options: string[] // 將 options 改為 string 的數組形式
    onSelectChange: (selectedValue: string) => void // 使用函數類型來描述 onSelectChange，它接收一個 string 參數並且不返回任何值
    className?: string // Add className prop
    defaultValue?: string
}

const SelectInput: React.FC<SelectProps> = ({
    placeholder,
    onSelectChange,
    options,
    className, // Add className prop
    defaultValue = '',
}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('')

    const handleChange = (value: string) => {
        setSelectedValue(value)
        onSelectChange(value)
    }
    return (
        <Select.Root
            value={selectedValue}
            onValueChange={(newValue) => handleChange(newValue ?? '')}
            defaultValue={defaultValue}>
            <Select.Trigger
                className={clsx(
                    'inline-flex h-full w-full items-center justify-between rounded-md bg-gray-1 px-4 py-[10px] text-small2 leading-150 text-white shadow-sm ring-1 ring-inset ring-gray-3 placeholder:text-small2 placeholder:text-gray-4 focus:outline-none focus:ring-2 focus:ring-primary md:text-body md:placeholder:text-body',
                    className, // Apply custom className
                )}
                aria-label="city"
                disabled={options.length === 0}
                asChild={false}>
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="z-50 mt-14 overflow-hidden rounded-md bg-gray-1 text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    side="bottom"
                    sideOffset={30}>
                    <Select.ScrollUpButton className="h-[25px] cursor-default items-center justify-center bg-gray-3 text-white placeholder:flex">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="rounded-lg border border-gray-3">
                        <Select.Group>
                            {options.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={option}
                                    onClick={() => handleChange(option)}
                                    className={clsx(
                                        'flex select-none items-center justify-start border border-x-0 border-gray-3 px-4 py-3 text-body hover:bg-gray-3 hover:text-primary',
                                        {
                                            'bg-gray-2':
                                                option === selectedValue,
                                        },
                                    )}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex h-[25px]  cursor-default items-center justify-center bg-gray-3 text-white">
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
interface SelectItemProps {
    value: string
    className?: string
    children?: React.ReactNode
    disabled?: boolean
    onClick: () => void // 更新 onClick 属性
}
const SelectItem: React.FC<SelectItemProps> = ({
    value,
    children,
    onClick,
    ...props
}) => {
    return (
        <Select.Item value={value} onClick={onClick} {...props}>
            <Select.ItemText>{children}</Select.ItemText>
            {/* <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator> */}
        </Select.Item>
    )
}

export default SelectInput
