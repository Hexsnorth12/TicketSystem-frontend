import 'next-auth'
import type { User } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: User
        accessToken?: string
    }

    interface User {
        account: string
        email: string
        accountType: string
        token: string
        refreshToken: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends User {
        accessToken: string
        accessTokenExpires: number
    }
}
