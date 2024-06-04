import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" h-auto">
            <div>{children}</div>
        </div>
    )
}

export default Layout
