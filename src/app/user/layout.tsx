import React from 'react'
import { Sidebar } from '@/components/layout'
import { Breadcrumbs } from '@/components/common'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="container h-[88px] pt-5">
                <Breadcrumbs />
            </div>
            <div className="container flex flex-col  items-start rounded-lg md:flex-row">
                <div className="w-full bg-gray-1 px-2.5 md:w-4/12">
                    <Sidebar />
                </div>
                <div className="w-full px-2.5 md:w-8/12">{children}</div>
            </div>
        </>
    )
}

export default Layout
