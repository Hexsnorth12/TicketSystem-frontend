import React from 'react'
import * as Select from '@radix-ui/react-select'
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@radix-ui/react-icons'

const SelectDemo: React.FC = () => (
    <Select.Root>
        <Select.Trigger
            className="text-violet11 hover:bg-mauve3 data-[placeholder]:text-violet9 inline-flex h-[35px] w-full items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none shadow-[0_2px_10px] shadow-black/10 outline-none focus:shadow-[0_0_0_2px] focus:shadow-primary"
            aria-label="Food">
            <Select.Value placeholder="Select a fruit…" />
            <Select.Icon className="text-violet11">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                    <Select.Group>
                        <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
                            Fruits
                        </Select.Label>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                    </Select.Group>

                    <Select.Separator className="bg-violet6 m-[5px] h-[1px]" />

                    <Select.Group>
                        <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
                            Vegetables
                        </Select.Label>
                        <SelectItem value="aubergine">Aubergine</SelectItem>
                        <SelectItem value="broccoli">Broccoli</SelectItem>
                        <SelectItem value="carrot" disabled>
                            Carrot
                        </SelectItem>
                        <SelectItem value="courgette">Courgette</SelectItem>
                        <SelectItem value="leek">Leek</SelectItem>
                    </Select.Group>

                    <Select.Separator className="bg-violet6 m-[5px] h-[1px]" />

                    <Select.Group>
                        <Select.Label className="text-mauve11 px-[25px] text-xs leading-[25px]">
                            Meat
                        </Select.Label>
                        <SelectItem value="beef">Beef</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="lamb">Lamb</SelectItem>
                        <SelectItem value="pork">Pork</SelectItem>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
)

interface SelectItemProps {
    value: string
    className?: string
    children?: React.ReactNode
    disabled?: boolean
}
const SelectItem: React.FC<SelectItemProps> = ({ children, ...props }) => {
    return (
        <Select.Item
            className={
                'text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none'
            }
            {...props}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    )
}

export default SelectDemo
