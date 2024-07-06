export interface CommentPayload {
    productId: string
    rating: number
    content: string
    status: string
}

export interface CommentData {
    _id: string
    rating: number
    content: string
    status: string
    createdAt: string
    updatedAt: string
    productId: string
    userId: string
}

export interface TransferPayload {
    orderId: string
    productId: string
}

export interface TransferCodeData {
    shareCode: string
}
export interface SellPayload {
    orderId: string
    productId: string
    amount: number
}

export interface Plan {
    name: string
    discount: number
    headCount: number
}

export interface NewProduct {
    soldAmount: number
    title: string
    brief: string
    type: string
    genre: string
    vendor: string
    theater: string
    price: number
    amount: number
    isLaunched: boolean
    isPublic: boolean
    recommendWeight: number
    sellEndAt: string
    sellStartAt: string
    endAt: string
    startAt: string
    photoPath: string
    introduction: string
    notifications: string[]
    highlights: string[]
    cautions: string[]
    confirmations: string[]
    cancelPolicies: string[]
    certificates: string[]
    tagNames: string[]
    plans: Plan[]
}

export interface IMeta {}
