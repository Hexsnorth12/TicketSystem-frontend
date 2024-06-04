'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

const ClientSessionProvider = ({
    session,
    children,
}: {
    session: Session | null
    children: React.ReactNode
}) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default ClientSessionProvider
