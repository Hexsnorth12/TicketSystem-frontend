import type { Meta, StoryObj } from '@storybook/react'
import Tag from './tag'
import { FaMapMarkerAlt } from 'react-icons/fa'
const meta = {
    title: 'common/Tag',
    component: Tag,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        icon: FaMapMarkerAlt,
        tagValue: '台北',
        iconColor: 'gray-4',
    },
}
