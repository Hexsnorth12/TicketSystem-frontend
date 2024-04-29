import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Modal from './Modal'

const meta = {
  title: 'Example/Modal',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocss
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    children: <p>Login Page</p>,
  },
}
