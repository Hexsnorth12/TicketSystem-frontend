import { useState, useEffect } from 'react'
import fetchClient from '@/lib/fetchClient'
import { Ticket } from '@/types'

const useScrollFetch = (
    prevData: Ticket[],
    limit: number,
    page: number,
    dataName: string,
    status: string,
) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<boolean>(false)
    const [dataList, setDataList] = useState(prevData)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        // 防止重複請求
        if (page <= 1) {
            setDataList(prevData)
            return
        }

        const fetchProducts = async () => {
            try {
                setLoading(true)
                // 定義參數
                const params = new URLSearchParams({
                    limit: limit.toString(),
                    page: page.toString(),
                    status,
                })

                const data = await fetchClient({
                    method: 'GET',
                    url: `api/v1/product?${params.toString()}`,
                })
                if (data[dataName].length <= 0) {
                    setHasMore(false)
                } else {
                    setDataList((prevState) => [
                        ...prevState,
                        ...data[dataName],
                    ])
                }
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [page, status])

    return { loading, error, dataList, hasMore }
}

export default useScrollFetch
