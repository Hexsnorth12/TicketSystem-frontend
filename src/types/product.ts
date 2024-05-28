// 基本的商品資料型別，依需求繼承擴充
// 使用在 card, movieDetail等商品相關 api
export type Movie = {
    id: string
    name: string
    image: string
    type: string
    date: string
    isAvailable: boolean
}
