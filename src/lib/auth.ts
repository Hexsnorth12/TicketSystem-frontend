import type { NextAuthOptions, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { BASE_URL, serverCode } from '@/definitions'
import fetchClient from './fetchClient'
import { jwt } from '@/utils'

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

                    throw new Error(`${errorData.message}`)
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile: async (profile: GoogleProfile) => {
                try {
                    const response = await fetch(`${BASE_URL}api/v1/user/google-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: profile.sub,
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();

                        return {
                            id: data.data.account,
                            email: data.data.email,
                            name: data.data.account,
                            token: data.data.token,
                            refreshToken: data.data.refreshToken,
                            accountType: data.data.accountType,
                            image: profile.picture,
                        } as User;
                    } else {
                        console.error('Google Login Failed:', await response.text());
                    }
                } catch (error) {
                    console.error("Error during backend verification:", error);
                }
                return {
                    id: '',
                    email: '',
                    name: '',
                    token: '',
                    refreshToken: '',
                    accountType: '',
                    image: '',
                } as User;
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.user = user;
                token.accessToken = user.token;
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
            session.accessToken = token.accessToken
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
