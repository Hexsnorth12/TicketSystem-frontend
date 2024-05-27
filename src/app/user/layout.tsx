import React from 'react'
import { Sidebar, Header } from '@/components/layout'
import { getUserSession } from '@/lib/auth.actions'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { session } = await getUserSession()
    const isAuth = session?.user.accountType ? true : false

    return (
        <>
            <Header logoSrc="/assets/Movie go.png" isAuth={isAuth} />
            <div className="h-[188px]"></div>
            <div className="container flex h-screen flex-col  items-start rounded-lg md:flex-row">
                <div className="w-full bg-gray-1 px-2.5 md:block md:w-4/12">
                    <Sidebar />
                </div>
                <div className="w-full px-2.5 md:w-8/12">{children}</div>
            </div>
        </>
    )
}

export default Layout
