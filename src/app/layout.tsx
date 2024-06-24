import React from 'react'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import { Footer, Header } from '@/components/layout'
import StoreProviders from '@/components/common/StoreProviders'
import ClientSessionProvider from '@/components/common/ClientSessionProvider'
import DateProvider from '@/components/layout/DateProvider'
import { getUserSession } from '@/lib/auth.actions'
import { Suspense } from 'react'
import Loading from './loading'
import '@/styles/globals.css'
import { AlertProvider } from '@/components/useAlert/useAlert'
const noto_Sans_TC = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Movie Go',
    description:
        'Buying movie tickets, purchasing together with friends, finding people online to watch movies together',
}

export default async function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    const { session } = await getUserSession()

    const isAuth = session?.user.accountType ? true : false
    return (
        <StoreProviders>
            <DateProvider>
                <html lang="en">
                    <body
                        className={`${noto_Sans_TC.className} flex h-screen flex-col bg-gray-2`}>
                        <ClientSessionProvider session={session}>
                            {' '}
                            <Header
                                logoSrc="/assets/movie-go-logo.png"
                                isAuth={isAuth}
                            />
                            <main className="mb-8 grow bg-gray-2 pt-[88px] md:mb-[60px]">
                                <Suspense fallback={<Loading />}>
                                    <AlertProvider>
                                        {children}
                                        {modal}
                                    </AlertProvider>
                                </Suspense>
                            </main>
                            <Footer />
                        </ClientSessionProvider>
                    </body>
                </html>
            </DateProvider>
        </StoreProviders>
    )
}
