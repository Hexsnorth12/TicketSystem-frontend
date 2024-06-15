import type { Meta } from '@storybook/react'
import React from 'react'
import Card from './Card'
import MovieDescriptionCard from './MovieDescription'
import MovieDetailCard from './MovieDetail'

import { DummyProductDetail } from '@/definitions/movieDetailData'
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
export const MovieDetail = () => {
    return <MovieDetailCard product={DummyProductDetail} />
}
export const MovieDescription = () => {
    return <MovieDescriptionCard product={DummyProductDetail} />
}
