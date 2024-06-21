import React from 'react'
import { DataTableHeader } from '@/components/common'

interface DataSellProps {}

const DataSell: React.FC<DataSellProps> = () => {
    return (
        <div className="container">
            <div className="rounded-lg bg-gray-1">
                <div className="rounded-t-lg bg-secondary px-10 py-3">
                    <h2 className="text-btn2 text-white">使用者評價</h2>
                </div>
                <div className="rounded-b-lg p-10">
                    <DataTableHeader />
                </div>
            </div>
        </div>
    )
}

export default DataSell
