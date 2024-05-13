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

export const Primary: Story = {
    args: {
        placeholder: '訂閱電子報',
        label: '縣市',
        options: [],
        onSelectChange: () => {},
    },
}
