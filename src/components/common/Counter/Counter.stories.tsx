import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Counter from './Counter'

const meta = {
    title: 'common/Counter',
    component: Counter,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    decorators: (story) => (
        <div className="container">
            <div className="flex">{story()}</div>
        </div>
    ),
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        onValueChange: () => {},
        initialValue: 1,
        minValue: 1,
        maxValue: 999,
    },
}
