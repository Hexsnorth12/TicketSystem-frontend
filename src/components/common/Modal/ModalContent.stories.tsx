'use client'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ModalContent from './ModalContent'

const meta = {
    title: 'common/ModalContent',
    component: ModalContent,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocss
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof ModalContent>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
    args: {
        children: (
            <div className="flex p-4">
                <div className="rounded-l-lg border border-r-0 border-gray-3 bg-gray-1 px-3 py-2">
                    <p className="text-small1 text-white">3141232131231</p>
                </div>
                <div className="items-center rounded-r-lg border border-gray-3 bg-gray-1 px-3 py-2 text-primary hover:bg-primary hover:text-gray-1">
                    <span className="text-small2 md:text-small1">複製</span>
                </div>
            </div>
        ),
    },
}
