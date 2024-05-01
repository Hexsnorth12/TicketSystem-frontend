import type { Meta, StoryObj } from '@storybook/react'
import TextInput from './input'

const meta = {
  title: 'common/TextInput',
  component: TextInput,

  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: 'centered',
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: '訂閱電子報',
    type: 'text',
    value: '',
    onChange: () => {},
  },
}
