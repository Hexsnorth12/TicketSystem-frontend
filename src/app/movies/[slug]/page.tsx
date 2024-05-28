'use client'
import MovieDetailCard from '@/components/common/Card/MovieDetail'
import MovieDetailTab from '@components/common/Tab/movieDetail'
import { Popcards } from '@/definitions/movieData'
import { useEffect, useState } from 'react'
import CommentGroup from '@components/layout/CommentGroup/CommentGroup'

import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MovieDescriptionCard from '@/components/common/Card/MovieDescription'

async function Page(slug: string) {
    const id = parseInt(slug, 10)
    const movie = Popcards.find((movie) => movie.id === id)
    return movie || {}
}
const DetailsPage = ({ params }: { params: { slug: string } }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            const movieData = await Page(params.slug)
            setData(movieData ? [movieData] : [])
        }

        fetchData()
    }, [params])

    if (!data.length) {
        return <div>Loading...</div>
    }
    const tabs = [
        {
            label: '電影介紹',
            Component: <MovieDescriptionCard movies={data} />,
        },
        {
            label: '評價',
            Component: <CommentGroup />,
        },
    ]
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-96 h-80 w-full md:mb-0 md:h-full">
                <MovieDetailCard movies={data} />
            </div>
            <div className="flex w-full justify-center md:mt-0">
                <MovieDetailTab tabs={tabs} />
            </div>
        </div>
    )
}

export default DetailsPage
