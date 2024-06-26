import { UserComment } from './user'
// 基本的商品資料型別，依需求繼承擴充
// 使用在 card, movieDetail等商品相關 api

// TODO: 這邊保留部分跟API 不同的屬性，避免直接拿掉導致相關的組件壞掉，有改到相關組件再順便回來改這裡
export interface Product {
    _id: string
    title: string
    photoPath: string
    type: string
    price?: number
    startAt?: string
    endAt?: string
    recommendWeight?: number
    isPublic?: boolean
    theater?: string
    isAvailable?: boolean // 要請後端新增
}

export interface ProductDetail extends Product {
    rank: number // FIXED: 資料沒有這項屬性
    soldAmount: number
    genre: string
    amount: number
    sellStartAt: string
    sellEndAt: string
    isLaunched: boolean
    notifications: string[]
    highlights: string[]
    introduction: string
    cautions: string[]
    confirmations: string[]
    cancelPolicies: string[]
    certificates: string[]
    plans: ProductPlan[]
    tags: { name: string }[]
    brief: string
    isFavorite: boolean
}

export interface ProductPlan {
    name: string
    discount: number
    headCount: number
}

// 擴展 CartItem 接口
export interface CartItem extends Product {
    quantity: number
    selectedPlan: ProductPlan // 可選的選擇方案
}
export interface Comment {
    _id: string
    rating: number
    content: string
    status: string
    createAt: string
    updateAt: string
    user: UserComment
}

export interface SelfComment extends Comment {
    product: {
        title: string
        photoPath: string
    }
}
export interface ProductFavorite extends Product {
    genre: string
    price: number
    soldAmount: number
    amount: number
    isLaunched: boolean
    sellStartAt: string
    sellEndAt: string
}

export type Ticket = {
    photoPath: string
    _id: string
    productId: string
    userId: string
    orderId: string
    status: 'unverified' | 'expired' | 'refunded' // 對應 可使用 | 已失效 ｜ 已退票
    isPublished: boolean
    expiredAt: string
    writeOffAt: string
    writeOffStaffId: string
    giverId: string
    product: Product
    shareCode: string
}

export type TicketDetail = {
    _id: string
    userId: string
    orderId: string
    productId: string
    status:
        | 'unverified' // 未核銷使用
        | 'verified' // 已核銷使用
        | 'refunded' // 已取消且有退款
        | 'expired' // 已過期
        | 'cancelled' // 已取消且無退款
        | 'pending' // 發生問題的票券
        | 'transfer' // 正在分票，等待被別人取票，無法被任何人使用
    isPublished: boolean
    title: string
    photoPath: string
    theater: string
    price: number
    expiredAt: string
    startAt: string
    purchaseAt: string
    purchaseAmount: number
}

export type ShareOrder = {
    orderId: string
    productId: string
    productName: string
    photoPath: string
    theater: string
    startAt: string
    expiredAt: string
    amount: 7
}
