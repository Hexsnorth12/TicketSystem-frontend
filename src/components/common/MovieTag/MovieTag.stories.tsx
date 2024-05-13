import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MovieTag from './MovieTag'

const meta = {
    title: 'common/MovieTag',
    component: MovieTag,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => <div className="">{story()}</div>,
} satisfies Meta<typeof MovieTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: '科幻類',
    },
}
