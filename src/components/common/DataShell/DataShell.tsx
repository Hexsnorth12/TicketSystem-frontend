import React from 'react'

interface DataSellProps {
    title: string
    children?: React.ReactNode
}

const DataShell: React.FC<DataSellProps> = ({ title, children }) => {
    return (
        <div className="container">
            <div className="rounded-lg bg-gray-1">
                <div className="rounded-t-lg bg-secondary px-10 py-3">
                    <h2 className="text-btn2 text-white">{title}</h2>
                </div>
                <div className="rounded-b-lg p-10">{children}</div>
            </div>
        </div>
    )
}

export default DataShell
