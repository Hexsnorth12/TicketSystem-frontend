'use client'
import React from 'react'
import CheckoutTable from '@components/common/Table/checkoutTable'
import { Delivery } from '@/components/forms'
import { DataSource, Column } from '@/types/cart'
import { useCartStore } from '@/stores/useCartStore'
import { bellota } from '@/components/fonts'

const CheckoutPage = () => {
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
    const dataSource: DataSource[] = []
    const cart = useCartStore((state) => state.cart)
    cart.forEach((item) => {
        const dataSourceItem: DataSource = {
            key: item._id,
            name: {
                image: item.photoPath,
                title: item.title,
                subtitle: item.selectedPlan.name,
            },
            number: item.quantity,
            price:
                (item.price as number) *
                item.selectedPlan.discount *
                item.selectedPlan.headCount,
        }

        dataSource.push(dataSourceItem) // 添加到 dataSource 数组中
    })
    const total = cart.reduce((acc, product) => {
        const selectedPlan = product.selectedPlan // 确保这里的 selectedPlan 是正确的
        const price = product.price ?? 0
        if (selectedPlan && selectedPlan.discount && selectedPlan.headCount) {
            return (
                acc +
                price *
                    selectedPlan.discount *
                    selectedPlan.headCount *
                    product.quantity
            )
        }
        // 如果没有折扣信息，按原价计算
        return acc + price * product.quantity
    }, 0)
    const originalTotal = cart.reduce((acc, product) => {
        const price = product.price ?? 0
        const headCount = product.selectedPlan.headCount
        return acc + price * headCount * product.quantity
    }, 0)

    const discount = originalTotal - total
    return (
        <div className="relative isolate overflow-hidden py-16 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-6">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-header4 font-bold tracking-wider text-white sm:text-6xl">
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
                            <ul
                                role="list"
                                className="mb-4 mt-10 grid grid-cols-1 justify-items-end gap-4  text-small1 leading-6  text-white sm:grid-cols-1 sm:gap-6 md:text-body">
                                <li className="flex gap-x-3">
                                    <span>原價：</span>
                                    <span className={bellota.className}>
                                        {`${originalTotal}  NT`}
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <span>方案折扣：</span>
                                    <span className={bellota.className}>
                                        {`- ${discount}  NT`}
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <span>總金額：</span>
                                    <span className={bellota.className}>
                                        {`${total}  NT`}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3 w-full  rounded-lg  p-4  text-white ">
                            <Delivery />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
