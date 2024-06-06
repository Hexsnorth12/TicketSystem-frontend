import type { Meta } from '@storybook/react'
import React from 'react'
import Table from './table'
import CartTable from './cartTable'
import CheckoutTable from './checkoutTable'

const meta = {
    title: 'common/Table',
    component: Table,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Table>

//沒圖片的
const dataSourceBasic = [
    {
        key: '1',
        name: '哥吉拉與金剛 : 新帝國',
        number: 32,
        price: 32,
    },
    {
        key: '2',
        name: '哥吉拉與金剛 : 新帝國',
        number: 42,
        price: 32,
    },
    {
        key: '3',
        name: '哥吉拉與金剛 : 新帝國',
        number: 32,
        price: 32,
    },
]
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

export default meta

export const Peimary = () => {
    return <Table columns={columns} dataSource={dataSourceBasic} />
}
export const Cart = () => {
    return <CartTable columns={columns} dataSource={dataSource} />
}
export const Checkout = () => {
    return <CheckoutTable columns={columns} dataSource={dataSource} />
}
