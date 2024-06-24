'use client'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AdminSidebar from './AdminSidebar'

const meta = {
    title: 'layout/AdminSidebar',
    component: AdminSidebar,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'none',
    },
    decorators: (story) => (
        <div className="container h-dvh bg-black">{story()}</div>
    ),
} satisfies Meta<typeof AdminSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
