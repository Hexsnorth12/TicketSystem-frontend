import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Scrollbar from './Scrollbar'

const meta = {
    title: 'common/Scrollbar',
    component: Scrollbar,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container h-dvh bg-black">
            <div className="w-full md:w-4/12 md:px-6 md:py-8">
                <div className="-mx-3 border-b border-gray-3 py-3 md:mx-0 md:rounded-lg md:border md:px-4">
                    {story()}
                </div>
            </div>
        </div>
    ),
} satisfies Meta<typeof Scrollbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
