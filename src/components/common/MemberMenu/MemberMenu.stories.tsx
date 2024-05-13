import type { Meta, StoryObj } from '@storybook/react'
import MemberMenu from './MemberMenu'

const meta = {
    title: 'common/MemberMenu',
    component: MemberMenu,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof MemberMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
