import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CommentCard from './CommentCard'
import avatar from '@images/avatar.jpg'

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
    args: {
        avatar: avatar,
        userName: 'lovealgebra',
        comment:
            '你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」',
        stars: 4,
    },
}
