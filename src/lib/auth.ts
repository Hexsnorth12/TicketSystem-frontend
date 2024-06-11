import type { NextAuthOptions, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwt } from '@/utils'
import fetchClient from './fetchClient'
import { serverCode } from '@/definitions'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                account: { label: 'account', type: 'text' },
                pwd: { label: 'pwd', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const data = await fetchClient({
                        method: 'POST',
                        url: 'api/v1/user/login',
                        body: JSON.stringify(credentials),
                    })

                    if (!data.data) throw data

                    if (data.data) {
                        return data.data
                    }
                    return null
                } catch (error) {
                    if (
                        (
                            error as {
                                status: string
                                message: string
                                data: null
                            }
                        ).status &&
                        (
                            error as {
                                status: string
                                message: string
                                data: null
                            }
                        ).status === serverCode.PASSWORD_NOT_MATCH
                    ) {
                        throw new Error((error as { message: string }).message)
                    }
                    const err = error as Response
                    const errorData = await err.json()

                    throw new Error(
                        `status: ${errorData.status}; message: ${errorData.message}`,
                    )
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }

            const accessTokenExpires = token.exp as number
            const currentUnixTimestamp = Math.floor(Date.now() / 1000)
            const accessTokenHasExpired =
                currentUnixTimestamp > accessTokenExpires

            if (accessTokenHasExpired) {
                return await refreshAccessToken(token)
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user as User
            return session
        },
    },
    events: {
        async signOut() {
            // await fetchClient({
            //     method: 'POST',
            //     url: BASE_URL + '/api/logout',
            //     token: token.user.token,
            // })
        },
    },
}

// TODO: 等後端實作再詳細處理
async function refreshAccessToken(token: JWT) {
    try {
        const response = await fetchClient({
            method: 'POST',
            url: '/api/refresh',
            token: token.accessToken,
        })

        if (!response.ok) throw response

        const refreshedAccessToken: { token: string } = await response.json()
        const { exp } = jwt.decode(refreshedAccessToken.token)
        const user = token.user as User
        return {
            ...token,
            user: {
                ...user,
                token: refreshedAccessToken.token,
            },
            accessToken: refreshedAccessToken.token,
            exp,
        }
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        }
    }
}
