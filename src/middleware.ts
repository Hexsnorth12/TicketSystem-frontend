import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { BASE_URL, serverCode, protectedRoutes } from '@/definitions'

export async function middleware(req: NextRequest) {
    const token = cookies().get('token')?.value
    const response = await fetch(`${BASE_URL}api/v1/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'force-cache',
    }).then((res) => res.json())

    const { status, data: profile } = response
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    // 取不到 user info 一律重導回登入頁
    if (isProtectedRoute && status === serverCode.NOT_LOGGEN_IN) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const next_response = NextResponse.next()
    next_response.cookies.set({
        name: 'user-profile',
        value: JSON.stringify(profile),
        httpOnly: true,
        path: '/',
    })
    return next_response
}

// match all except specific paths
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|login|signup).*)',
    ],
}
