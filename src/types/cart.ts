import { CartItem } from '@/types/product'

export type CartModal = {
    visible: boolean
    items: CartItem[]
    totalItems: number
    total: number
    leaveModalHandler: () => void
}

export type CartModalItem = {
    productInfo: CartItem
    className?: string
}
export type DataSource = {
    key: string
    name: {
        image: string
        title: string
        subtitle: string
    }
    number: number
    price: number
}
export type Column = {
    title: string
    dataIndex: keyof DataSource
    key: string
}
