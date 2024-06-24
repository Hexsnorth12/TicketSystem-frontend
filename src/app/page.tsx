'use client' // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import {
    mdiFire,
    mdiHeartCircle,
    mdiAccountMultipleOutline,
    mdiTicketConfirmation,
} from '@mdi/js'
import { NavBanner } from '@components/layout'
import PopProductList from '@components/common/Card/PopProductList'
import RecProductList from '@components/common/Card/RecProductList'
import GroupProductList from '@components/common/Card/GroupProductList'
import TicketProductList from '@components/common/Card/TicketProductList'
import { useSession } from 'next-auth/react'
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/services/modules/user'
import {
    fetchPopProducts,
    fetchRecProducts,
    fetchGroupProducts,
    fetchTicketProducts,
    Product,
    Group,
    Ticket,
} from '../definitions/movieData'
import Marquee from '@/components/common/Swiper/Marquee'
import Loading from '@/components/LoadingSkeleton/Loading'
import Alert from '@mui/material/Alert'
interface HeaderTitleProps {
    title: string
    iconPath: string
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, iconPath }) => {
    return (
        <div className="container flex items-center py-2 md:px-32 md:py-4 ">
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

const HomePage: React.FC = () => {
    const [popproducts, setPopProducts] = useState<Product[]>([])
    const [recproducts, setRecProducts] = useState<Product[]>([])
    const [groupproducts, setGroupProducts] = useState<Group[]>([])
    const [ticketproducts, setTicketProducts] = useState<Ticket[]>([])
    const [favorites, setFavorites] = useState<Record<string, boolean>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false) // 控制是否显示 Alert 的状态

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    popProducts,
                    recProducts,
                    groupProducts,
                    ticketProducts,
                ] = await Promise.all([
                    fetchPopProducts(),
                    fetchRecProducts(),
                    fetchGroupProducts(),
                    fetchTicketProducts(),
                ])
                setPopProducts(popProducts)
                setRecProducts(recProducts)
                setGroupProducts(groupProducts)
                setTicketProducts(ticketProducts)
                // 初始化收藏状态
                const initialFavorites: Record<string, boolean> = {}
                ;[...popProducts, ...recProducts].forEach((product) => {
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
    const [addFavorite, { isLoading }] = useAddFavoriteMutation()
    const [removeFavorite, { isLoading: isLoadingRemove }] =
        useRemoveFavoriteMutation()
    const handleUpdateFavorite = async (productId: string) => {
        if (!session) {
            setShowAlert(true) // 显示 Alert
            setTimeout(() => setShowAlert(false), 3000) // 3 秒后隐藏 Alert
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
            <Marquee />

            <HeaderTitle title="熱門電影" iconPath={mdiFire} />
            <PopProductList
                products={popproducts}
                favorites={favorites}
                onUpdateFavorite={handleUpdateFavorite}
            />
            <HeaderTitle title="你可能會喜歡" iconPath={mdiHeartCircle} />
            <RecProductList
                products={recproducts}
                favorites={favorites}
                onUpdateFavorite={handleUpdateFavorite}
            />
            <HeaderTitle
                title="一起揪團"
                iconPath={mdiAccountMultipleOutline}
            />
            <GroupProductList groups={groupproducts} />
            <NavBanner type="join" />
            <HeaderTitle title="分票專區" iconPath={mdiTicketConfirmation} />
            <TicketProductList tickets={ticketproducts} />
            <NavBanner type="ticket" />
            {showAlert && (
                <div className="fixed bottom-10 right-20 z-50">
                    <Alert severity="warning">請先登入後收藏</Alert>
                </div>
            )}
        </>
    )
}

export default HomePage
