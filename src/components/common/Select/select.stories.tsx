import type { Meta, StoryObj } from '@storybook/react'
import SelectInput from './select'

const meta = {
    title: 'common/Select',
    component: SelectInput,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof SelectInput>

export default meta
type Story = StoryObj<typeof meta>
const priceOptions = Array.from({ length: 8 }, (_, index) => {
    const start = index * 500 + 1
    const end = start + 499
    return `${start}-${end}`
})
export const Primary: Story = {
    args: {
        placeholder: '訂閱電子報',
        label: '縣市',
        options: priceOptions,
        onSelectChange: () => {},
    },
}
