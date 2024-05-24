import { NextRequest, NextResponse } from 'next/server'
import { protectedRoutes } from '@/definitions'
import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'

export default withAuth(
    async function middleware(req: NextRequest) {
        // const session = await getSe, ssion()
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        })
        const path = req.nextUrl.pathname
        const isProtectedRoute = protectedRoutes.includes(path)
        if (!token && isProtectedRoute) {
            const redirectUrl = new URL('/login', req.url)
            redirectUrl.searchParams.set('callbackUrl', req.nextUrl.href)
            return NextResponse.redirect(redirectUrl)
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    },
)

// match all except specific paths
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|assets|favicon.ico|login|signup).*)',
    ],
}
