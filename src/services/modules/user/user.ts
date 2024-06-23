export interface UpdateFavoriteData {
    productId: string
}

export interface InfoPayload {
    name?: string
    birthDate?: string
    email?: string
    gender?: string
    phone?: string
    address?: string
    imgUrl?: string
}

export interface ShareCodePayload {
    shareCode: string
}

export interface TicketData {
    _id: string
    productId: string
    userId: string
    orderId: string
    status: string
    isPublished: boolean
    createdAt: string
    updatedAt: string
    expiredAt: string
    writeOffAt: string
    writeOffStaffId: string
    giverId: string
    shareCode: string
}

export interface IMeta {}
