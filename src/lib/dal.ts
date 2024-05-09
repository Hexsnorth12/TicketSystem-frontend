import 'server-only'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { BASE_URL, serverCode } from '@/definitions'

// 可在資料請求, Server Actions, Route Handlers, server components 使用 
export const verifySession = async () => {
    const token = cookies().get('token')?.value as string
    try {
        const response = await fetch(`${BASE_URL}api/v1/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            cache: 'force-cache',
        })
        const { status, data: userProfile } = await response.json()

        if (!response.ok || status === serverCode.NOT_LOGGED_IN) {
            redirect('/login')
        }
        return { isAuth: true, userProfile }
    } catch (err) {
        return { isAuth: false, error: err }
    }
}
