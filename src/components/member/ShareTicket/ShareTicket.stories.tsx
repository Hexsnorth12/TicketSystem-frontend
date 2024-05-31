import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ShareTicket from './ShareTicket'

const meta = {
  title: 'ticket/ShareTicket',
  component: ShareTicket,
  parameters: {
      nextjs: {
          appDirectory: true,
      },
  },
  decorators: (story) => (
      <div className="container h-lvh bg-black">{story()}</div>
  ),
} satisfies Meta<typeof ShareTicket>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
