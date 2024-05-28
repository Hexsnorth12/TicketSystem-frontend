'use client'
import MovieDetailCard from '@/components/common/Card/MovieDetail'
import MovieDetailTab from '@components/common/Tab/movieDetail'
import { Popcards } from '@/definitions/movieData'
import { useEffect, useState } from 'react'
import CommentGroup from '@components/layout/CommentGroup/CommentGroup'
import * as React from 'react'
import MovieDescriptionCard from '@/components/common/Card/MovieDescription'

// 定義 Movie 接口
interface Movie {
    id: number
    name: string
    image: string
    type: string
    rank: number
    price: number
}

async function Page(slug: string): Promise<Movie | null> {
    const id = parseInt(slug, 10)
    const movie = Popcards.find((movie) => movie.id === id)
    return movie || null
}
const DetailsPage = ({ params }: { params: { slug: string } }) => {
    const [data, setData] = useState<Movie[]>([])

    useEffect(() => {
        async function fetchData() {
            const movieData = await Page(params.slug)
            setData(movieData ? [movieData as Movie] : [])
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
            <div className="flex w-full justify-center md:mt-0 md:w-10/12">
                <MovieDetailTab tabs={tabs} />
            </div>
        </div>
    )
}

export default DetailsPage
