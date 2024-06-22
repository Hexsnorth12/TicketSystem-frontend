import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DataTable from './DataTable'
import { OrderHeadCell, dummyOrder } from '@/definitions/dataTable'

const meta = {
    title: 'common/DataTable',
    component: DataTable,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => <div className="container bg-gray-1">{story()}</div>,
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        headCells: OrderHeadCell,
        rows: dummyOrder,
    },
}
