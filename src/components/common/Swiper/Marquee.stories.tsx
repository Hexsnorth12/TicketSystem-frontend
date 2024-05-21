import type { Meta, StoryObj } from '@storybook/react'
import Marquee from './Marquee'

const meta = {
    title: 'common/Marquee',
    component: Marquee,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
