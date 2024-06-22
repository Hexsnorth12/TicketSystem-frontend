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

 const tickets = {
    "tickets": [
      {
        "_id": "asdfasdfasd",
        "productId": "cdscsdcsdc",
        "userId": "123235564364567",
        "orderId": "iiddidididi",
        "status": "unverified",
        "isPublished": false,
        "createdAt": "2024-06-22T15:17:33.510Z",
        "updatedAt": "2024-06-22T15:17:33.510Z",
        "expiredAt": "2024-06-22T15:17:33.510Z",
        "writeOffAt": "2024-06-22T15:17:33.510Z",
        "writeOffStaffId": "rrr",
        "giverId": "iiddidididi",
        "product": {
          "_id": "66570169343ccb01f586dfed",
          "title": "這是個很棒的電影名稱",
          "theater": "信義威秀",
          "price": 1100,
          "startAt": "2024-08-13T16:00:00.000Z",
          "recommendWeight": 1,
          "isPublic": false,
          "photoPath": ""
        },
        "shareCode": "1234567"
      }
    ],
    "page": 10,
    "limit": 1,
    "totalCount": 1
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

