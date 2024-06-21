'use client'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataSell from './DataSell'

const meta = {
    title: 'common/DataSell',
    component: DataSell,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container bg-gray-2 p-10">{story()}</div>
    ),
} satisfies Meta<typeof DataSell>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
