import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CommentCard from './CommentCard'

const meta = {
    title: 'common/CommentCard',
    component: CommentCard,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container bg-gray-2">
            <div className="">{story()}</div>
        </div>
    ),
} satisfies Meta<typeof CommentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
