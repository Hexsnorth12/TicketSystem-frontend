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

export interface IMeta {}
