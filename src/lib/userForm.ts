'use server'

import { BASE_URL } from '@/definitions'
import { formatISO, parse } from 'date-fns'
import { ZodError, z } from 'zod'
import { revalidateTag } from 'next/cache'
import { getUserSession } from '@/lib/auth.actions'

export type State =
    | {
          status: 'success'
          message: string
      }
    | {
          status: 'error'
          message: string
          errors?: Array<{
              path: string
              message: string
          }>
      }
    | null

const userFormSchema = z.object({
    name: z
        .string({ message: '信箱格式格式不正確' })
        .min(1, { message: '請輸入名稱' })
        .max(10, { message: '名稱不能超過10個字' }),
    email: z.string().email({ message: '信箱格式格式不正確' }),
    phone: z
        .string({ message: '信箱格式格式不正確' })
        .regex(/^09\d{8}$/, { message: '手機格式不正確' })
        .length(10, { message: '手機格式不正確' }),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: '請輸入正確日期格式',
    }),
    address: z.string().min(1, { message: '請輸入地址' }),
})

export const getUserForm = async (
    prevState: State | null,
    formData: FormData,
): Promise<State> => {
    try {
        const { session } = await getUserSession()
        const payload = userFormSchema.parse(Object.fromEntries(formData))

        await fetch(`${BASE_URL}api/v1/user`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session!.accessToken}`,
            },
            body: JSON.stringify({
                ...payload,
                ...(payload?.birthDate && {
                    birthDate: formatISO(
                        parse(
                            payload?.birthDate as string,
                            'yyyy-MM-dd',
                            new Date(),
                        ),
                    ),
                }),
            }),
        }).then((res) => res.json())

        //TODO: 加上處理失敗情況 { status: '6302', message: 'token 過期', data: {} }

        revalidateTag('info')
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
