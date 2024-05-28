import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen">
            <div className="container">
                <div className="w-full md:mx-auto md:w-6/12">{children}</div>
            </div>
        </div>
    )
}

export default Layout
