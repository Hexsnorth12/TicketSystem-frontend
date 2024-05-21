import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import EmptyData from './EmptyData'

const meta = {
    title: 'common/EmptyData',
    component: EmptyData,

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
} satisfies Meta<typeof EmptyData>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
