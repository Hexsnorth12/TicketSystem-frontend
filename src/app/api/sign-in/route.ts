import { cookies } from 'next/headers'
import { BASE_URL } from '@/definitions'

// 設置每次 request 都獲得最新資料
export const dynamic = 'force-dynamic'

// api/sign-in
export async function POST(request: Request) {
    try {
        const { account, pwd } = await request.json()

        const response = await fetch(`${BASE_URL}api/v1/user/login`, {
            method: 'POST',
            body: JSON.stringify({ account, pwd }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (response.ok) {
            cookies().set({
                name: 'token',
                value: data.data.token,
                httpOnly: true,
                path: '/',
            })
        }
        const responseHeaders = new Headers(response.headers)

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: responseHeaders,
        })
    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}
