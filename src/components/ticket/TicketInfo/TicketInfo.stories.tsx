import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TicketInfo from './TicketInfo'

const meta = {
    title: 'ticket/TicketInfo',
    component: TicketInfo,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="h-screen">
            <div className="container h-full bg-gray-2 py-6">
                <div className="md:w-4/12 md:pr-10">{story()}</div>
            </div>
        </div>
    ),
} satisfies Meta<typeof TicketInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
