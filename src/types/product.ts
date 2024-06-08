// 基本的商品資料型別，依需求繼承擴充
// 使用在 card, movieDetail等商品相關 api

// TODO: 這邊保留部分跟API 不同的屬性，避免直接拿掉導致相關的組件壞掉，有改到相關組件再順便回來改這裡
export interface Product {
    id: string // 要拿掉 , 等於 _id
    _id: string
    name: string // 要拿掉 , 等於 title
    title: string
    image: string // 要拿掉 , 等於 photoPath
    photoPath: string
    type: string
    date: string // 要拿掉 , 沒有這個屬性
    isAvailable: boolean // 要拿掉 , 沒有這個屬性
}

export interface ProductDetail extends Product {
    rank: number // FIXED: 資料沒有這項屬性
    price: number
    soldAmount: number
    genre: string
    theater: string
    amount: number
    startAt: string
    endAt: string
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
    plans: string[]
    tags: string[]
    brief: string
}
