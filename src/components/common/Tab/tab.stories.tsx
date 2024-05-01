import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Tab from './tab'

const meta = {
    title: 'common/Tab',
    component: Tab,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: <p>到期票卷</p>,
    },
}
