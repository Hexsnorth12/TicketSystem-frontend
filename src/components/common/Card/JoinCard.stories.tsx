import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import JoinCard from './JoinCard'

const meta: Meta<typeof JoinCard> = {
    title: 'common/JoinCard',
    component: JoinCard,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: [
        (story) => <div className="w-[216px] bg-black p-3">{story()}</div>,
    ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
