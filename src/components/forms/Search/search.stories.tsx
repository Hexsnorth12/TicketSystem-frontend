import type { Meta, StoryObj } from '@storybook/react'
import Search from './search'

const meta = {
    title: 'forms/Search',
    component: Search,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
