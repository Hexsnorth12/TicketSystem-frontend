import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TicketBoard from './TicketBoard'

const meta = {
    title: 'ticket/TicketBoard',
    component: TicketBoard,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="h-screen">
            <div className="container h-full bg-gray-2 py-6">
                <div className="w-full md:w-8/12">{story()}</div>
            </div>
        </div>
    ),
} satisfies Meta<typeof TicketBoard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
