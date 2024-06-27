'use client'

import React, { useMemo, useEffect, useTransition } from 'react'
import { useForm, FieldPath } from 'react-hook-form'
import { useFormState } from 'react-dom'
import { format, parseISO } from 'date-fns'
import { InputRegister, Button } from '@/components/common'
import { State, getUserForm } from '@/lib'
import type { UserInfo } from '@/types'
import LoadingSkeleton from '@/components/LoadingSkeleton/Loading'
import { useAlert } from '@/components/useAlert/useAlert'
interface UserInfoProps {
    userInfo: UserInfo
}

export interface FormValues {
    name: string
    email: string
    phone: number
    birthDate: string
    address: string
}

const UserInfoForm: React.FC<UserInfoProps> = ({ userInfo }) => {
    const {
        register,
        formState: { errors },
        setError,
        reset,
    } = useForm<FormValues>()
    const showAlert = useAlert()
    const [state, formAction] = useFormState<State, FormData>(getUserForm, null)
    const [pending, startTransaction] = useTransition()
    const birthday = useMemo(() => {
        if (userInfo.birthDate) {
            return format(parseISO(userInfo.birthDate), 'yyyy-MM-dd')
        }
        return ''
    }, [userInfo.birthDate])
    useEffect(() => {
        if (!state) return

        if (state.status === 'error') {
            state.errors?.forEach((error) => {
                showAlert('修改失敗', 'error')
                setError(error.path as FieldPath<FormValues>, {
                    message: error.message,
                })
            })
        }
        if (state.status === 'success') {
            showAlert('修改成功', 'success')
            reset()
        }
    }, [state, setError])
    return (
        <form
            className="relative"
            action={(formData) => startTransaction(() => formAction(formData))}>
            <div className="space-y-2 md:space-y-2.5">
                {pending && (
                    <div className="absolute top-0">
                        <LoadingSkeleton />
                    </div>
                )}
                <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="姓名"
                        type="text"
                        placeholder={'請填寫姓名'}
                        registerKey="name"
                        register={register}
                        defaultValue={userInfo.name}
                        errors={errors}
                    />
                    <InputRegister
                        label="電子信箱"
                        type="email"
                        placeholder={'請填寫email'}
                        registerKey="email"
                        register={register}
                        defaultValue={userInfo.email}
                        errors={errors}
                    />
                </div>
                <div className="items-top flex flex-col justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="手機號碼"
                        type="text"
                        placeholder={'請填寫手機號碼'}
                        registerKey="phone"
                        register={register}
                        defaultValue={userInfo.phone}
                        errors={errors}
                    />
                    <InputRegister
                        label="生日"
                        type="date"
                        placeholder={'請輸入生日'}
                        registerKey="birthDate"
                        register={register}
                        defaultValue={birthday}
                        errors={errors}
                    />
                </div>
                <div className="flex flex-col items-center justify-start space-y-2 md:flex-row md:space-x-12 md:space-y-0">
                    <InputRegister
                        label="地址"
                        type="text"
                        placeholder={'請輸入地址'}
                        registerKey="address"
                        register={register}
                        defaultValue={userInfo.address}
                        errors={errors}
                    />
                    {/* <InputRegister
                        label="電子信箱"
                        type="email"
                        placeholder=""
                        registerKey="email"
                        register={register}
                    /> */}
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    name="confirm"
                    value="確認"
                    type={'submit'}
                    title="confirm"
                    className="mt-10"
                />
            </div>
        </form>
    )
}

export default UserInfoForm
