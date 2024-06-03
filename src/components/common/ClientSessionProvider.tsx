'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

const ClientSessionProvider = ({
    session,
    children,
}: {
    session: never
    children: React.ReactNode
}) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default ClientSessionProvider
