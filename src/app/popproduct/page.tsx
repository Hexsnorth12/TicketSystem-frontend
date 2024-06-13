'use client' // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import PopProductList from '@/components/common/Card/PopProductList'
import fetchClient from '@/lib/fetchClient'
import { getUserSession } from '@/lib/auth.actions'

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

const PopProductPage: React.FC = () => {
    const [popproducts, setPopProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPopProducts = async () => {
            try {
                const { session } = await getUserSession()
                const token = session?.user?.token
                const params = new URLSearchParams({
                    limit: '10',
                    page: '1',
                    isPublic: 'true',
                    sortField: 'soldAmount',
                    sortOrder: 'asc',
                })

                const { data } = await fetchClient({
                    method: 'GET',
                    url: `api/v1/product?${params.toString()}`,
                    token,
                    tags: ['product'],
                })

                if (data && data.products) {
                    const updatedProducts = data.products.map(
                        (product: Product) => ({
                            ...product,
                            photoPath: product.photoPath.startsWith('/')
                                ? product.photoPath
                                : `/${product.photoPath}`,
                        }),
                    )
                    setPopProducts(updatedProducts)
                } else {
                    setError('未找到商品')
                }
            } catch (err) {
                setError('獲取商品失敗')
            } finally {
                setLoading(false)
            }
        }

        fetchPopProducts()
    }, [])

    if (loading) {
        return <div>加載中...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return <PopProductList products={popproducts} />
}

export default PopProductPage
