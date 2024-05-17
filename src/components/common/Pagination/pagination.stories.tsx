import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './pagination'

const meta = {
    title: 'common/Pagination',
    component: Pagination,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>
const people = [
    'Bob',
    'Lisa',
    'Anika',
    'Obi',
    'Sara',
    'Bob',
    'Lisa',
    'Anika',
    'Obi',
    'Sara',
]
const pageLimit = 2

export const Primary: Story = {
    args: {
        items: people,
        pageLimit: pageLimit, //每頁顯示資料
    },
}
