import { NextRequest, NextResponse } from 'next/server'
import { protectedRoutes } from '@/definitions'
import { getSession } from './lib'

export async function middleware(req: NextRequest) {
    const session = getSession()
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    // 樂觀驗證, 只還原 base64 取 user id , 取不到session 重導回登入頁
    if (isProtectedRoute && !session?.id) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

// match all except specific paths
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|login|signup).*)',
    ],
}
