import type { Meta, StoryObj } from '@storybook/react'
import Marquee from './Marquee' // Ensure the import path is correct
// Ensure the meta object is initialized correctly and conforms to Meta<typeof Marquee>
const meta: Meta<typeof Marquee> = {
    title: 'common/Marquee',
    component: Marquee,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
