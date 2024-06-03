'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@radix-ui/react-icons'
interface SelectProps {
    placeholder?: string
    label: string
    options: string[] // 將 options 改為 string 的數組形式
    onSelectChange: (selectedValue: string) => void // 使用函數類型來描述 onSelectChange，它接收一個 string 參數並且不返回任何值
}

const SelectInput: React.FC<SelectProps> = ({
    placeholder,
    label,
    onSelectChange,
    options,
}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('')

    const handleChange = (value: string) => {
        setSelectedValue(value)
        onSelectChange(value)
    }
    return (
        <Select.Root
            value={selectedValue}
            onValueChange={(newValue) => handleChange(newValue ?? '')}>
            <Select.Trigger
                className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[35px] w-full items-center justify-center gap-[5px] rounded bg-gray-1 px-[15px] text-[13px] leading-none text-white shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary"
                aria-label="city"
                disabled={options.length === 0}>
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="text-violet11">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="z-50 mt-1 overflow-hidden rounded-md bg-gray-1 text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                    position="popper">
                    <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px]">
                        <Select.Group>
                            <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
                                {label}
                            </Select.Label>
                            {options.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={option}
                                    onClick={() => handleChange(option)}>
                                    {option}
                                </SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
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
        <Select.Item
            value={value}
            className={
                'text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none'
            }
            onClick={onClick}
            {...props}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    )
}

export default SelectInput
