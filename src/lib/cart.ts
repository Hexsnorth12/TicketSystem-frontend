import fetchClient from '@/lib/fetchClient'

export const fetchCartInfo = async () => {
    try {
        const response = await fetchClient({
            method: 'GET',
            url: `api/v1/cart?limit=8&page=20`,
        })
        return response.data // 假设 response.data 是 API 返回的数据
    } catch (error) {
        console.error('Failed to fetch cart info:', error)
        return null
    }
}
