import React from 'react'
import {
    mdiFire,
    mdiHeartCircle,
    mdiAccountMultipleOutline,
    mdiTicketConfirmation,
} from '@mdi/js'
import { Header } from '@components/layout'
import Card from '@components/common/Card/Card'
import RecCard from '@components/common/Card/RecCard'
import GroupCard from '@components/common/Card/GroupCard'
import ShareCard from '@components/common/Card/ShareCard'
import {
    Popcards,
    Reccards,
    Groupcards,
    Sharecards,
} from '../definitions/movieData'

import { generateImageSizeMap } from '../utils/imageUtils'
import { verifySession } from '@/lib'
import Marquee from '@components/common/Swiper/Marquee'

interface HeaderTitleProps {
    title: string
    iconPath: string
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, iconPath }) => {
    return (
        <div className="container flex items-center px-32 py-4">
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

const HomePage = async () => {
    const { isAuth } = await verifySession()

    const popcardImageSources = Popcards.map((Popcards) => Popcards.image)
    const popcardImageSizeMap = generateImageSizeMap(
        popcardImageSources,
        240,
        320,
    )
    const reccardImageSources = Reccards.map((Reccards) => Reccards.image)
    const reccardImageSizeMap = generateImageSizeMap(
        reccardImageSources,
        240,
        320,
    )
    const groupcardImageSources = Groupcards.map(
        (Groupcards) => Groupcards.image,
    )
    const groupcardImageSizeMap = generateImageSizeMap(
        groupcardImageSources,
        288,
        173,
    )
    const sharecardImageSources = Sharecards.map(
        (Sharecards) => Sharecards.image,
    )
    const sharecardImageSizeMap = generateImageSizeMap(
        sharecardImageSources,
        160,
        160,
    )

    return (
        <>
            <Header logoSrc="/assets/Movie go.png" isAuth={isAuth} />

            <main className="min-h-screen bg-gray-2 pt-[88px]">
                <Marquee />
                <HeaderTitle title="熱門電影" iconPath={mdiFire} />
                <Card movies={Popcards} imageSizeMap={popcardImageSizeMap} />
                <HeaderTitle title="你可能會喜歡" iconPath={mdiHeartCircle} />
                <RecCard movies={Reccards} imageSizeMap={reccardImageSizeMap} />
                <HeaderTitle
                    title="一起揪團"
                    iconPath={mdiAccountMultipleOutline}
                />
                <GroupCard
                    movies={Groupcards}
                    imageSizeMap={groupcardImageSizeMap}
                />
                <HeaderTitle
                    title="分票專區"
                    iconPath={mdiTicketConfirmation}
                />
                <ShareCard
                    movies={Sharecards}
                    imageSizeMap={sharecardImageSizeMap}
                />
            </main>
        </>
    )
}

export default HomePage
