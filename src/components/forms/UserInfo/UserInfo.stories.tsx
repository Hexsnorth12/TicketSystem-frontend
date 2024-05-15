import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import UserInfo from './UserInfo'

const meta = {
    title: 'forms/UserInfo',
    component: UserInfo,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container">
            <div className="mx-auto w-8/12 border px-4">{story()}</div>
        </div>
    ),
} satisfies Meta<typeof UserInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        userInfo: {
            name: 'Joe',
            createdAt: '2024-1-1',
            birthDate: '2024-11-11',
            phone: 912345678,
            gender: 'none',
            address: '',
            imgUrl: '',
            account: '',
            email: 'hex@mail.com',
            token: '',
        },
    },
}
