import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta = {
    title: 'common/Button',
    component: Button,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        type: 'button',
        title: '電影詳情',
        onClick: () => {},
        className: '',
        disabled: false,
    },
}

export const FormButton: Story = {
    args: {
        type: 'submit',
        title: '電影詳情',
        onClick: () => {},
        className: '',
        disabled: false,
        name: 'userName',
        value: 'USER',
    },
}
