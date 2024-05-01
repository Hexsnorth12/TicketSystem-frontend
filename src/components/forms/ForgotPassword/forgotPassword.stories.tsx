import type { Meta, StoryObj } from '@storybook/react'
import ForgetPassWord from './forgotPassword'

const meta = {
    title: 'forms/ForgetPassWord',
    component: ForgetPassWord,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof ForgetPassWord>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
