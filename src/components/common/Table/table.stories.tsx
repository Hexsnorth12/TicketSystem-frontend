import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, ReactNode } from 'react'
import Table from './table'
import CartTable from './cartTable'
import Button from '@components/common/Button'
import { MdDelete } from 'react-icons/md'
import { number } from 'zod'
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

export default meta

export const Peimary = () => {
    return <Table columns={columns} dataSource={dataSourceBasic} />
}
export const CustomContent = () => {
    return <CartTable columns={columns} dataSource={dataSource} />
}
