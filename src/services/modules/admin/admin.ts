export interface OrderData {
    _id: string
    thirdPartyPaymentId: string
    user: {
        account: string
        name: string
        phone: string
        email: string
    }
    orders: {
        title: string
        brief: string
        type: string
        genre: string
        vendor: string
        theater: string
        price: number
    }[]
    paymentMethod: string
    price: number
    status: string
    createdAt: string
    paidAt: string
}

export interface OrderPayload {
    limit: number
    page: number
    createdAtFrom?: string
    createdAtTo?: string
    status?: string
}

export interface verifyTicketPayload {
    tickets: {
        productId: string
        ticketId: string
        userId: string
    }[]
}

export interface verifyTicketData {
    tickets: {
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
    }[]
}

export interface TicketsData {
    tickets: {
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
        product: {
            _id: string
            title: string
            theater: string
            price: number
            startAt: string
            recommendWeight: number
            isPublic: boolean
            photoPath: string
        }
        shareCode: string
    }[]
    page: number
    limit: number
    totalCount: number
}



export interface IMeta {}

