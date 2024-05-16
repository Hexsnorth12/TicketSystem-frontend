import React from 'react'
import type { Meta } from '@storybook/react'
import InputRegister from './InputRegister'
import { useForm } from 'react-hook-form'

const meta = {
    title: 'common/InputRegister',
    component: InputRegister,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof InputRegister>

export default meta

export const Primary = {
    args: {
        label: '姓名',
        type: 'text',
        placeholder: '請輸入姓名',
        registerKey: 'name',
        defaultValue: '王小明',
    },
    render: function Render(args: {
        label: string
        type: string
        placeholder: string
        registerKey: string
        defaultValue: string
    }) {
        const {
            register,
            formState: { errors },
        } = useForm()

        return <InputRegister {...args} register={register} errors={errors} />
    },
}
