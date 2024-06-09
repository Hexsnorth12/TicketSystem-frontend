import type { Meta } from '@storybook/react'
import React from 'react'
import Card from './Card'
import GroupCard from './GroupCard'
import MovieDescriptionCard from './MovieDescription'
import MovieDetailCard from './MovieDetail'
import RecCard from './RecCard'

import { Popcards, Reccards, Groupcards } from '@/definitions/movieData'
import { DummyProductDetail } from '@/definitions/movieDetailData'
import { generateImageSizeMap } from '@/utils'
const popcardImageSources = Popcards.map((Popcards) => Popcards.image)
const popcardImageSizeMap = generateImageSizeMap(popcardImageSources, 240, 320)
const groupcardImageSources = Groupcards.map((Groupcards) => Groupcards.image)
const groupcardImageSizeMap = generateImageSizeMap(
    groupcardImageSources,
    288,
    173,
)
const reccardImageSources = Reccards.map((Reccards) => Reccards.image)
const reccardImageSizeMap = generateImageSizeMap(reccardImageSources, 240, 320)
const meta = {
    title: 'common/Card',
    component: Card,

    parameters: {
        nextjs: {
            appDirectory: true,
        },
        layout: 'centered',
    },
} satisfies Meta<typeof Card>

export default meta
export const Primary = () => {
    return <Card movies={Popcards} imageSizeMap={popcardImageSizeMap} />
}
export const Group = () => {
    return (
        <GroupCard movies={Groupcards} imageSizeMap={groupcardImageSizeMap} />
    )
}
export const MovieDetail = () => {
    return <MovieDetailCard product={DummyProductDetail} />
}
export const MovieDescription = () => {
    return <MovieDescriptionCard product={DummyProductDetail} />
}
export const Rec = () => {
    return <RecCard movies={Reccards} imageSizeMap={reccardImageSizeMap} />
}
