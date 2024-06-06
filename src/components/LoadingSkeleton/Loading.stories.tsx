import type { Meta, StoryObj } from '@storybook/react'
import Loading from './Loading'
const meta = {
    title: 'Loading',
    component: Loading,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
