import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from './checkbox'

const meta = {
  title: 'common/Checkbox',
  component: Checkbox,

  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: '訂閱電子報',
    value: '',
    onChange: () => {},
  },
}
