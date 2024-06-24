import React from 'react'
import { AdminSidebar } from '@/components/layout'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="container mt-[88px] flex flex-col items-start rounded-lg md:flex-row md:items-stretch md:gap-[60px]">
                <div className="mb-3 w-full px-2.5 md:mb-0 md:w-4/12">
                    <AdminSidebar />
                </div>
                <div className="w-full px-2.5 md:w-8/12">{children}</div>
            </div>
        </>
    )
}

export default Layout
