import type { Meta, StoryObj } from '@storybook/react'
import Breadcrumbs from './Breadcrumbs'

const meta = {
    title: 'common/Breadcrumbs',
    component: Breadcrumbs,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
