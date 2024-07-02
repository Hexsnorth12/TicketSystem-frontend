'use client' // This is a client component 👈🏽
import React, { useState, useEffect } from 'react'
import { Popcards } from '../../../definitions/marqueeData'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import GeneralProductList from '@components/common/Card/GeneralProductList'
import {
    fetchGeneralProducts,
    fetchResultProducts,
    fetchResult2Products,
    Product,
} from '../../../definitions/movieData'
import { useAlert } from '@/components/useAlert/useAlert'
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/services/modules/user'
import Loading from '@/components/LoadingSkeleton/Loading'

type Popcard = {
    image: string
    name: string
}

function shuffleArray(array: Popcard[]): Popcard[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export default function SearchResult() {
    const [generalProducts, setGeneralProducts] = useState<Product[]>([])
    const [resultProducts, setResultProducts] = useState<Product[]>([])
    const [favorites, setFavorites] = useState<Record<string, boolean>>({})
    const [shuffledPopcards, setShuffledPopcards] = useState<Popcard[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const showAlert = useAlert()

    //Favorite Function
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [generalProducts] = await Promise.all([
                    fetchGeneralProducts(),
                ])
                setGeneralProducts(generalProducts)
                // 初始化收藏状态
                const initialFavorites: Record<string, boolean> = {}
                ;[...generalProducts].forEach((product) => {
                    initialFavorites[product._id] = product.isFavorite
                })
                setFavorites(initialFavorites)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An unknown error occurred.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async (theater: string) => {
            try {
                const [resultProducts] = await Promise.all([
                    fetchResultProducts(theater),
                ])
                setResultProducts(resultProducts)
                // 初始化收藏状态
                const initialFavorites: Record<string, boolean> = {}
                ;[...resultProducts].forEach((product) => {
                    initialFavorites[product._id] = product.isFavorite
                })
                setFavorites(initialFavorites)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('An unknown error occurred.')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const { data: session } = useSession()
    const [addFavorite] = useAddFavoriteMutation()
    const [removeFavorite] = useRemoveFavoriteMutation()
    const handleUpdateFavorite = async (productId: string) => {
        if (!session) {
            showAlert('登入後收藏', 'warning')
            return
        }
        const currentStatus = favorites[productId]
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [productId]: !currentStatus,
        }))

        try {
            if (currentStatus) {
                await removeFavorite({
                    productId,
                    token: session?.accessToken ?? '',
                }).unwrap()
            } else {
                await addFavorite({
                    productId,
                    token: session?.accessToken ?? '',
                }).unwrap()
            }
        } catch (error) {
            // Handle error (optional)
            setFavorites((prevFavorites) => ({
                ...prevFavorites,
                [productId]: currentStatus,
            }))
        }
    }

    useEffect(() => {
        setShuffledPopcards(shuffleArray([...Popcards]))
    }, [])
    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }
    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <div className="relative  h-screen w-screen">
                {shuffledPopcards.map((popcard, index) => (
                    <div key={index}>
                        <div className="h-full w-full">
                            <Image
                                fill
                                objectFit="cover"
                                src={popcard.image}
                                alt={popcard.name}
                            />
                        </div>
                    </div>
                ))}
                <div className="absolute bottom-0 left-0 m-4 flex flex-col items-start md:space-y-4">
                    <span className="text-header5 font-bold tracking-widest text-white md:text-header2">
                        找到了
                        <span className="text-primary">13</span>
                        個電影票券！
                    </span>
                    <span className="mb-4 text-left text-body text-white">
                        太讚惹！在<span className="text-primary">信義威秀</span>
                        找到 13 個電影票券 🏝
                    </span>
                </div>
            </div>
            <div className="h-screen w-screen">
                <GeneralProductList
                    products={generalProducts}
                    favorites={favorites}
                    onUpdateFavorite={handleUpdateFavorite}
                />
            </div>
            <div className="h-screen w-screen">
                <GeneralProductList
                    products={resultProducts}
                    favorites={favorites}
                    onUpdateFavorite={handleUpdateFavorite}
                />
            </div>
        </>
    )
}
