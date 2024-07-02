import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-[150px]">
            <div>{children}</div>
        </div>
    )
}

export default Layout
