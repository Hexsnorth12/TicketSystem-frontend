type ProductInfo = { img: string; name: string; amount: number; type: string }

export type CartModal = {
    visible: boolean
    items: ProductInfo[]
    leaveModalHandler: () => void
}

export type CartModalItem = {
    productInfo: ProductInfo
    className?: string
}
