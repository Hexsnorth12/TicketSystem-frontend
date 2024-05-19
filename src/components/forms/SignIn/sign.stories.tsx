import type { Meta, StoryObj } from '@storybook/react'
import SignIn from './signIn'

const meta = {
    title: 'forms/SignIn',
    component: SignIn,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
