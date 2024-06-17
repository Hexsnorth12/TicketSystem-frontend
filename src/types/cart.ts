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
