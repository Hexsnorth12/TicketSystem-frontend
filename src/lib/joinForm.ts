'use server'

import { BASE_URL } from '@/definitions'
import { ZodError, z } from 'zod'
import { State } from '@/types'
import { getUserSession } from '@/lib/auth.actions'

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
    groupId: z.string().min(1),
})

export const getJoinForm = async (
    prevState: State | null,
    formData: FormData,
): Promise<State> => {
    try {
        const { session } = await getUserSession()
        const payload = joinFormSchema.parse(Object.fromEntries(formData))

        await fetch(`${BASE_URL}api/v1/group/join/${payload.groupId}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session!.accessToken}`,
            },
            body: JSON.stringify({
                name: payload.name,
                nickName: payload.nickName,
                phone: payload.phone,
                lineId: payload.lineId,
            }),
        }).then((res) => res.json())

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
