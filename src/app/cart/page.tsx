import React from 'react'
import CartTable from '@components/common/Table/cartTable'

const CartPage = async () => {
    // 在组件内部使用 useMemo

    const columns = [
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
    //有圖片的
    const dataSource = [
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
                        購物車
                    </h2>
                </div>
                <div className="mx-auto mt-10 max-w-7xl lg:mx-0 lg:max-w-none">
                    <div className="flex flex-col flex-wrap justify-around gap-x-4 text-left md:flex-row md:flex-nowrap">
                        <div className=" md:basis-2/3">
                            <CartTable
                                columns={columns}
                                dataSource={dataSource}
                            />
                        </div>
                        <div className="text-white md:basis-1/3">
                            <div className="flex items-center gap-x-4">
                                <h4 className="flex-none text-3xl font-semibold leading-6 text-white">
                                    結算
                                </h4>
                            </div>
                            <ul
                                role="list"
                                className="mt-10 grid grid-cols-1 gap-4 text-sm leading-6 text-white sm:grid-cols-1 sm:gap-6">
                                <li className="flex gap-x-3">金額:350 NT</li>
                                <li className="flex gap-x-3">折扣：-35 NT</li>
                                <li className="flex gap-x-3">總金額:315 NT</li>
                                <div className="h-px flex-auto bg-gray-100" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
