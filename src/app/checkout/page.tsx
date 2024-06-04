import React from 'react'
import CheckoutTable from '@components/common/Table/checkoutTable'
import { Button } from '@/components/common/index'
import { Delivery } from '@/components/forms'

const CheckoutPage = () => {
    interface Column {
        title: string
        dataIndex: keyof DataSource
        key: string
    }

    interface DataSource {
        key: string
        name: {
            image: string
            title: string
            subtitle: string
        }
        number: number
        price: number
    }
    const columns: Column[] = [
        {
            title: '商品名稱',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '數量',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '金額',
            dataIndex: 'price',
            key: 'price',
        },
    ]

    const dataSource: DataSource[] = [
        {
            key: '1',
            name: {
                image: '/assets/popcard1.jpg',
                title: '哥吉拉與金剛 : 新帝國',
                subtitle: '一人獨享',
            },
            number: 1,
            price: 230,
        },
        {
            key: '2',
            name: {
                image: '/assets/popcard2.jpg',
                title: '魔鬼剋星：冰天凍地',
                subtitle: '兩人同行',
            },
            number: 1,
            price: 360,
        },
        {
            key: '3',
            name: {
                image: '/assets/popcard3.jpg',
                title: '特別總集篇 名偵探柯南 vs 名偵探柯南',
                subtitle: '三人同行',
            },
            number: 2,
            price: 200,
        },
    ]

    return (
        <div className="relative isolate overflow-hidden py-16 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-6">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-wider text-white sm:text-6xl">
                        配送資料
                    </h2>
                </div>
                <div className="mx-auto mt-10 max-w-7xl lg:mx-0 lg:max-w-none">
                    <div className="flex flex-col  flex-wrap items-start justify-around gap-x-4 text-left  md:flex-nowrap">
                        <div className="w-full">
                            <CheckoutTable
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                        <div className="mt-3 w-full  rounded-lg bg-gray-3 p-4  text-white md:mt-0 ">
                            {/* <div className="flex justify-end gap-x-4">
                                <h4 className="flex-none text-body font-semibold leading-6 text-white md:text-3xl">
                                    結算
                                </h4>
                            </div> */}
                            <ul
                                role="list"
                                className="mb-4 mt-10 grid grid-cols-1 justify-items-end gap-4  text-small1 leading-6  text-white sm:grid-cols-1 sm:gap-6 md:text-body">
                                <li className="flex gap-x-3">金額:350 NT</li>
                                <li className="flex gap-x-3">折扣：-35 NT</li>
                                <li className="flex gap-x-3">總金額:315 NT</li>
                                <div className="h-px flex-auto bg-gray-100" />
                            </ul>
                            <Delivery />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
