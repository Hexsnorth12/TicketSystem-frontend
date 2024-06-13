import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MyTicke from './MyTicke'
import { dummyTicketList } from '@/definitions/movieData'

const meta = {
    title: 'common/MyTicke',
    component: MyTicke,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container h-lvh bg-black">{story()}</div>
    ),
} satisfies Meta<typeof MyTicke>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        ticket: dummyTicketList[0],
    },
}
