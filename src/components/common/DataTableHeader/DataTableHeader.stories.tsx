import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataTableHeader from './DataTableHeader'

const meta = {
    title: 'common/DataTableHeader',
    component: DataTableHeader,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container bg-gray-2 py-10">{story()}</div>
    ),
} satisfies Meta<typeof DataTableHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
