import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'

const meta = {
    title: 'common/Sidebar',
    component: Sidebar,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'none',
    },
    decorators: (story) => (
        <div className="container h-dvh bg-black">{story()}</div>
    ),
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
