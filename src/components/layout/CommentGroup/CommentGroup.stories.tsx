import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CommentGroup from './CommentGroup'

const meta = {
    title: 'common/CommentGroup',
    component: CommentGroup,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'none',
    },
    decorators: (story) => (
        <div className="container h-dvh bg-black">
            <div className="w-full">
                <div className="space-y-3 md:space-y-10">
                    {story()}
                    {story()}
                    {story()}
                    {story()}
                </div>
            </div>
        </div>
    ),
} satisfies Meta<typeof CommentGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        productId: '6665817fd23d0fe8146bcc80',
    },
}
