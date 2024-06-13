'use client' // This is a client component 👈🏽
import React, { useEffect, useState } from 'react'
import {
    mdiFire,
    mdiHeartCircle,
    mdiAccountMultipleOutline,
    mdiTicketConfirmation,
} from '@mdi/js'
import { NavBanner } from '@components/layout'
import GroupCard from '@components/common/Card/GroupCard'
import ShareCard from '@components/common/Card/ShareCard'
import PopProductList from '@components/common/Card/PopProductList'
import RecProductList from '@components/common/Card/RecProductList'
import { Groupcards, Sharecards } from '../definitions/movieData'
import {
    fetchPopProducts,
    fetchRecProducts,
    Product,
} from '../definitions/movieData'
import { generateImageSizeMap } from '../utils/imageUtils'
import Marquee from '@/components/common/Swiper/Marquee'

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
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [popProducts, recProducts] = await Promise.all([
                    fetchPopProducts(),
                    fetchRecProducts(),
                ])
                setPopProducts(popProducts)
                setRecProducts(recProducts)
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

    const groupCardImageSources = Groupcards.map(
        (GroupCards) => GroupCards.image,
    )
    const groupCardImageSizeMap = generateImageSizeMap(
        groupCardImageSources,
        288,
        173,
    )
    const shareCardImageSources = Sharecards.map(
        (ShareCards) => ShareCards.image,
    )
    const shareCardImageSizeMap = generateImageSizeMap(
        shareCardImageSources,
        160,
        160,
    )

    if (loading) {
        return <div>加載中...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <>
            <Marquee />
            <HeaderTitle title="熱門電影" iconPath={mdiFire} />
            <PopProductList products={popproducts} />
            <HeaderTitle title="你可能會喜歡" iconPath={mdiHeartCircle} />
            <RecProductList products={recproducts} />
            <HeaderTitle
                title="一起揪團"
                iconPath={mdiAccountMultipleOutline}
            />
            <GroupCard
                movies={Groupcards}
                imageSizeMap={groupCardImageSizeMap}
            />
            <NavBanner type="join" />
            <HeaderTitle title="分票專區" iconPath={mdiTicketConfirmation} />
            <ShareCard
                movies={Sharecards}
                imageSizeMap={shareCardImageSizeMap}
            />
            <NavBanner type="ticket" />
        </>
    )
}

export default HomePage
