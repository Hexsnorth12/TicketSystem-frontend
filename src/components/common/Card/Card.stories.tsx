import React from 'react'
import Card from './Card'
import GroupCard from './GroupCard'
import RecCard from './RecCard'
import MovieDetailCard from './MovieDetail'
import { Popcards, Reccards, Groupcards } from '@/definitions/movieData'
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
const reccardImageSources = Reccards.map((Reccards) => Reccards.image)
const reccardImageSizeMap = generateImageSizeMap(reccardImageSources, 240, 320)

export default {
    title: 'common/Card',
    component: Card,
}

export const Primary = () => {
    return <Card movies={Popcards} imageSizeMap={popcardImageSizeMap} />
}
export const Group = () => {
    return (
        <GroupCard movies={Groupcards} imageSizeMap={groupcardImageSizeMap} />
    )
}
export const Rec = () => {
    return <RecCard movies={Reccards} imageSizeMap={reccardImageSizeMap} />
}
export const MovieDetail = () => {
    return <MovieDetailCard movies={MovieDetailCards} />
}
