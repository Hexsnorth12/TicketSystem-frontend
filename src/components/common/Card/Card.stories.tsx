import type { Meta } from '@storybook/react'
import React from 'react'
import Card from './Card'
import GroupCard from './GroupCard'
import MovieDescriptionCard from './MovieDescription'
import MovieDetailCard from './MovieDetail'

import { Popcards, Groupcards } from '@/definitions/movieData'
import { MovieDetailCards } from '@/definitions/movieDetailData'
import { generateImageSizeMap } from '@/utils'
const popcardImageSources = Popcards.map((Popcards) => Popcards.image)
const popcardImageSizeMap = generateImageSizeMap(popcardImageSources, 240, 320)
const groupcardImageSources = Groupcards.map((Groupcards) => Groupcards.image)
const groupcardImageSizeMap = generateImageSizeMap(
    groupcardImageSources,
    288,
    173,
)
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
    return <MovieDetailCard movies={MovieDetailCards} />
}
export const MovieDescription = () => {
    return <MovieDescriptionCard movies={MovieDetailCards} />
}
