import type { Meta, StoryObj } from '@storybook/react'
import Chip from './chip'

const meta = {
    title: 'common/Chip',
    component: Chip,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        value: '訂閱電子報',
        onDelete: () => {},
    },
}
