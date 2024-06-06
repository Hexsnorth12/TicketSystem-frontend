'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import CartTable from '@components/common/Table/cartTable'
import { Button } from '@/components/common/index'

const CartPage = () => {
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
    const router = useRouter()
    const handleCheckout = () => {
        router.push('/checkout')
    }
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-bold tracking-wider text-white sm:text-6xl">
                    購物車
                </h2>
            </div>
            <div className="mx-auto mt-10 max-w-7xl lg:mx-0 lg:max-w-none">
                <div className="flex flex-col flex-wrap items-start justify-around gap-x-4 text-left md:flex-row md:flex-nowrap">
                    <div className=" md:basis-2/3">
                        <CartTable columns={columns} dataSource={dataSource} />
                    </div>
                    <div className="mt-3 w-full rounded-lg bg-gray-3 p-4 text-white md:mt-0 md:basis-1/3 ">
                        <div className="flex items-center gap-x-4">
                            <h4 className="flex-none text-body font-semibold leading-6 text-white md:text-3xl">
                                結算
                            </h4>
                        </div>
                        <ul
                            role="list"
                            className="mb-4 mt-10 grid grid-cols-1 gap-4  text-small1 leading-6  text-white sm:grid-cols-1 sm:gap-6 md:text-body">
                            <li className="flex gap-x-3">金額:350 NT</li>
                            <li className="flex gap-x-3">折扣：-35 NT</li>
                            <li className="flex gap-x-3">總金額:315 NT</li>
                            <div className="h-px flex-auto bg-gray-100" />
                        </ul>
                        <Button
                            onClick={handleCheckout}
                            type="button"
                            title=""
                            className="w-full">
                            去買單
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
