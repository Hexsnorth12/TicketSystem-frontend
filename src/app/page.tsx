import React from 'react'
import {
    mdiFire,
    mdiHeartCircle,
    mdiAccountMultipleOutline,
    mdiTicketConfirmation,
} from '@mdi/js'
import { NavBanner } from '@components/layout'
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

const HomePage = async () => {
    const popCardImageSources = Popcards.map((PopCards) => PopCards.image)
    const popCardImageSizeMap = generateImageSizeMap(
        popCardImageSources,
        240,
        320,
    )
    const recCardImageSources = Reccards.map((RecCards) => RecCards.image)
    const recCardImageSizeMap = generateImageSizeMap(
        recCardImageSources,
        240,
        320,
    )
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

    return (
        <>
            <Marquee />
            <HeaderTitle title="熱門電影" iconPath={mdiFire} />
            <Card movies={Popcards} imageSizeMap={popCardImageSizeMap} />
            <HeaderTitle title="你可能會喜歡" iconPath={mdiHeartCircle} />
            <RecCard movies={Reccards} imageSizeMap={recCardImageSizeMap} />
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
