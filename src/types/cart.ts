import { CartItem } from '@/types/product'

export type CartModal = {
    visible: boolean
    items: CartItem[]
    totalItems: number
    total: number
    leaveModalHandler: () => void
}
//打user api 傳來的訊息
export interface UserProductPlan {
    discount: number
    headCount: number
    name: string
    _id: string
}
export interface UserProduct {
    amount: number
    genre: string
    isLaunched: boolean
    photoPath: string
    price: number
    sellEndAt: string
    sellStartAt: string
    soldAmount: number
    title: string
    type: string
    _id: string
}
export type UserCartItem = {
    amount: number
    createdAt: string
    plan: UserProductPlan
    product: UserProduct
    updatedAt: string
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
