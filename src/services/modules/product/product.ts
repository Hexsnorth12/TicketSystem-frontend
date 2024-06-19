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

export interface IMeta {}
