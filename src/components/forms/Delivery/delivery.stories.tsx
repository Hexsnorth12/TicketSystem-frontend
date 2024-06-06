import type { Meta, StoryObj } from '@storybook/react'
import Delivery from './delivery'

const meta = {
    title: 'forms/delivery',
    component: Delivery,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Delivery>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
