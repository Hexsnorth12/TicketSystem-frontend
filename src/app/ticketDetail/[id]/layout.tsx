import React from 'react'
import { PrevPage } from '@/components/common'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="container hidden md:my-10 md:block">
                <PrevPage
                    pageName="我的電影票"
                    pagePath="/user/tickets?status=unverified"
                />
            </div>

            <div className="container mt-6 flex h-screen md:mt-0">
                {children}
            </div>
        </>
    )
}

export default Layout
