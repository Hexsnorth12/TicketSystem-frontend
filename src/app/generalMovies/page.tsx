'use client' // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import GeneralProductList from '@components/common/Card/GeneralProductList'
import { useSession } from 'next-auth/react'
import { mdiFireHydrant } from '@mdi/js'
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/services/modules/user'
import { fetchGeneralProducts, Product } from '../../definitions/movieData'
import Loading from '@/components/LoadingSkeleton/Loading'
import { useAlert } from '@/components/useAlert/useAlert'

interface HeaderTitleProps {
    title: string
    iconPath: string
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, iconPath }) => {
    return (
        <div className="container flex items-center py-2 md:px-32 md:py-6">
            <svg width="40" height="40" viewBox="0 0 24 24">
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00FFFF' }} />
                    <stop offset="100%" style={{ stopColor: '#00646A' }} />
                </linearGradient>
                <path fill="url(#grad)" d={iconPath} />
            </svg>
            <div className="text-header3 font-bold leading-150 text-white">
                {title}
            </div>
        </div>
    )
}

const GeneralMoviePage: React.FC = () => {
    const [generalProducts, setGeneralProducts] = useState<Product[]>([])
    const [favorites, setFavorites] = useState<Record<string, boolean>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const showAlert = useAlert()
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
    const { data: session } = useSession()
    const [addFavorite] = useAddFavoriteMutation()
    const [removeFavorite] = useRemoveFavoriteMutation()
    const handleUpdateFavorite = async (productId: string) => {
        if (!session) {
            showAlert('登入後收藏', 'warning')
            // setTimeout(() => setShowAlert(false), 3000) // 3 秒后隐藏 Alert
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
            <HeaderTitle title="電影總表" iconPath={mdiFireHydrant} />
            <GeneralProductList
                products={generalProducts}
                favorites={favorites}
                onUpdateFavorite={handleUpdateFavorite}
            />
        </>
    )
}

export default GeneralMoviePage
