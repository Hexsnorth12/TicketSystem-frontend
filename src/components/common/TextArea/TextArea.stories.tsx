import React from 'react'
import type { Meta } from '@storybook/react'
import TextArea from './TextArea'
import { useForm } from 'react-hook-form'

const meta = {
    title: 'common/TextArea',
    component: TextArea,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof TextArea>

export default meta

export const Primary = {
    args: {
        label: '描述',
        placeholder: '新增活動內容',
        registerKey: 'description',
    },
    render: function Render(args: {
        label: string
        placeholder: string
        registerKey: string
    }) {
        const { register } = useForm()

        return (
            <div className="mx-auto max-h-[500px] max-w-[600px] bg-gray-1 p-4">
                <TextArea {...args} register={register} />
            </div>
        )
    },
}
