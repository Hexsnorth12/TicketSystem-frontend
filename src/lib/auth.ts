import type { NextAuthOptions, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { BASE_URL } from '@/definitions'
import { jwt } from '@/utils'
import fetchClient from './fetchClient'
import { serverCode } from '@/definitions'

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
                    const response = await fetchClient({
                        method: 'POST',
                        url: `${BASE_URL}api/v1/user/login`,
                        body: JSON.stringify(credentials),
                    })
                    if (!response.ok) {
                        throw response
                    }
                    const data = await response.json()

                    if (!data.data) throw data

                    if (response.ok && data.data) {
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

                    throw new Error('Invalid user')
                }
            },
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
            session.user = token.user
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
            url: BASE_URL + '/api/refresh',
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
