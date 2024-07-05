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

const newProduct = {
    soldAmount: 0,
    title: '這是一個商品名稱',
    brief: '簡短的介紹介紹',
    type: 'premier',
    genre: 'action',
    vendor: '貓咪影業',
    theater: '信義威秀',
    price: 1100,
    amount: 100,
    isLaunched: false,
    isPublic: false,
    recommendWeight: 1,
    sellEndAt: '2024-07-04T17:25:24.464Z',
    sellStartAt: '2024-07-04T15:25:24.466Z',
    endAt: '2024-07-04T21:25:24.466Z',
    startAt: '2024-07-04T19:25:24.466Z',
    photoPath: '',
    introduction: '<p>很棒的商品</p>',
    notifications: ['通知一', '通知二'],
    highlights: ['亮點一', '亮點二'],
    cautions: ['事項一', '事項二'],
    confirmations: ['確認詳情一', '確認詳情二'],
    cancelPolicies: ['取消政策一', '取消政策二'],
    certificates: ['憑證類型一', '憑證類型二'],
    tagNames: ['讚讚的標籤,很厲害的標籤'],
    plans: [
        {
            name: '三人同行好棒棒',
            discount: 0.5,
            headCount: 10,
        },
    ],
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
