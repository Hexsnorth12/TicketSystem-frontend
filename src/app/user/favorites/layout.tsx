import React from 'react'

const Layout = async ({
    children,
    pagination,
}: {
    children: React.ReactNode
    pagination: React.ReactNode
}) => {
    return (
        <section>
            {children}
            <div className="mt-4 flex justify-center">{pagination}</div>
        </section>
    )
}

export default Layout
