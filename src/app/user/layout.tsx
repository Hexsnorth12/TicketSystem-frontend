import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container flex h-screen">
            <div className="hidden px-2.5 md:block md:w-4/12">
                <div className="h-full border"></div>
            </div>
            <div className="w-full px-2.5 md:w-8/12">{children}</div>
        </div>
    )
}

export default Layout
