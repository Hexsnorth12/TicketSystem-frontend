import React from 'react'

const Layout = async ({
    children,
    pagination,
}: {
    children: React.ReactNode
}) => {
    return <section>{children}</section>
}

export default Layout
