'use server'

import { ZodError, z } from 'zod'
import { State } from '@/types'
import fetchServer from './fetchServer'

const joinFormSchema = z.object({
    name: z
        .string({ message: '姓名格式不正確' })
        .min(1, { message: '請輸入名稱' })
        .max(10, { message: '名稱不能超過10個字' }),
    nickName: z
        .string({ message: '暱稱格式不正確' })
        .min(1, { message: '請輸入名稱' })
        .max(10, { message: '暱稱不能超過10個字' }),
    phone: z
        .string({ message: '電話格式不正確' })
        .regex(/^09\d{8}$/, { message: '電話格式不正確' })
        .length(10, { message: '電話格式不正確' }),
    lineId: z
        .string({ message: 'LINE ID格式不正確' })
        .min(1, { message: '請輸入LINE ID' }),
    group: z.string(),
})

export const getJoinForm = async (
    prevState: State | null,
    formData: FormData,
): Promise<State> => {
    try {
        const payload = joinFormSchema.parse(Object.fromEntries(formData))
        await fetchServer({
            method: 'PATCH',
            url: `api/v1/group/join/${payload.group}`,
            body: JSON.stringify({
                name: payload.name,
                nickname: payload.nickName,
                phone: payload.phone,
                lineId: payload.lineId,
            }),
        })

        return {
            status: 'success',
            message: 'success',
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                status: 'error',
                message: 'Something went wrong. Please try again.',
                errors: e.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                })),
            }
        }
        return {
            status: 'error',
            message: 'Something went wrong. Please try again.',
        }
    }
}
