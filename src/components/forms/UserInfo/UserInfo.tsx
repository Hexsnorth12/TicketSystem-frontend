'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useFormState } from 'react-dom'
import InputRegister from '@/components/common/Input/InputRegister'
import getUserForm, { State } from '@/app/api/userform/action'

interface UserInfoProps {}

interface FormValues {
    userName: string
    email: string
    phone: number
    birthday: string
    address: string
}

const UserInfo: React.FC<UserInfoProps> = () => {
    const {
        register,
        formState: { isValid },
    } = useForm<FormValues>()
    const [state, formAction] = useFormState<State, FormData>(getUserForm, null)
    console.log(state)
    return (
        <form action={formAction}>
            <div className="md:space-y-2.5">
                <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="姓名"
                        type="text"
                        placeholder=""
                        registerKey="userName"
                        register={register}
                    />
                    <InputRegister
                        label="電子信箱"
                        type="email"
                        placeholder=""
                        registerKey="email"
                        register={register}
                    />
                </div>
                <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="手機號碼"
                        type="text"
                        placeholder=""
                        registerKey="phone"
                        register={register}
                    />
                    <InputRegister
                        label="生日"
                        type="date"
                        placeholder=""
                        registerKey="birthday"
                        register={register}
                    />
                </div>
                <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="地址"
                        type="text"
                        placeholder=""
                        registerKey="address"
                        register={register}
                    />
                    <InputRegister
                        label="電子信箱"
                        type="email"
                        placeholder=""
                        registerKey="email"
                        register={register}
                    />
                </div>
            </div>
            <button
                type="submit"
                // disabled={!isValid}
                className="w-full rounded-md bg-primary px-6 py-2.5 text-white">
                Submit
            </button>
        </form>
    )
}

export default UserInfo
