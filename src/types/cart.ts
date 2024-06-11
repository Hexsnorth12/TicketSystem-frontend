export type ProductInfo = {
    _id: string // 產品的唯一標識符
    img: string // 產品的圖片 URL
    name: string // 產品名稱
    amount: number // 購物車中的產品數量
    type: string // 產品類型
    genre: string // 產品類型或風格
    price: number // 產品價格
    soldAmount: number // 已售出的數量
    totalAmount: number // 總數量
    isLaunched: boolean // 是否已上架
    sellStartAt: string // 銷售開始時間
    sellEndAt: string // 銷售結束時間
    title: string // 添加缺失的属性
    photoPath: string // 添加缺失的属性
    isAvailable: boolean // 添加缺失的属性
}

export type CartModal = {
    visible: boolean
    items: ProductInfo[]
    totalItems: number
    total: number
    leaveModalHandler: () => void
}

export type CartModalItem = {
    productInfo: ProductInfo
    totalItems: number
    className?: string
}

export type ApiResponseItem = {
    product: {
        isAvailable: boolean
        _id: string
        title: string
        type: string
        genre: string
        price: number
        soldAmount: number
        amount: number
        isLaunched: boolean
        photoPath: string
        sellStartAt: string
        sellEndAt: string
    }
    amount: number // 购物车中的产品数量
}
