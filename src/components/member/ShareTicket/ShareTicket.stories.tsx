import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ShareTicket from './ShareTicket'

const meta = {
    title: 'ticket/ShareTicket',
    component: ShareTicket,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container h-lvh bg-black">{story()}</div>
    ),
} satisfies Meta<typeof ShareTicket>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        order: {
            orderId: 'iiddidididi',
            productId: 'testproduct',
            productName: 'testproduct',
            photoPath:
                'https://thumb.ac-illust.com/0c/0c3c64e631df8b99256cf6de8fa8f12f_t.jpeg',
            theater: '秀秀',
            startAt: '2024-06-17T12:31:09.735Z',
            expiredAt: '2024-06-17T12:31:09.735Z',
            amount: 7,
        },
    },
}
