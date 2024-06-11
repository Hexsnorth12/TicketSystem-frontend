'use client' // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import ProductList from '@/components/common/Card/ProductList'
import fetchClient from '@/lib/fetchClient'
import { getUserSession } from '@/lib/auth.actions'
import { BASE_URL } from '@/definitions'

type Product = {
    limit: number
    page: string
    isPublic: boolean
    _id: string
    title: string
    type: string
    genre: string
    theater: string
    brief: string
    vendor: string
    price: number
    amount: number
    soldAmount: number
    isLaunched: boolean
    recommendWeight: number
    sellEndAt: string
    sellStartAt: string
    endAt: string
    startAt: string
    tags: { tagId: string }[]
    photoPath: string
}
const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { session } = await getUserSession()
                const token = session?.user?.token
                // 定義參數
                const params = new URLSearchParams({
                    limit: '10',
                    page: '1',
                    isPublic: 'true',
                })

                const { data } = await fetchClient({
                    method: 'GET',
                    url: `api/v1/product?${params.toString()}`,
                    token,
                    tags: ['product'],
                })

                if (data && data.products) {
                    setProducts(data.products)
                } else {
                    setError('未找到商品')
                }
            } catch (err) {
                setError('獲取商品失敗')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <div>加載中...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default ProductPage
