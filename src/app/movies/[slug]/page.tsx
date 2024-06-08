import MovieDetailCard from '@/components/common/Card/MovieDetail'
import MovieDetailTab from '@components/common/Tab/movieDetail'
import CommentGroup from '@components/layout/CommentGroup/CommentGroup'
import * as React from 'react'
import MovieDescriptionCard from '@/components/common/Card/MovieDescription'
import fetchClient from '@/lib/fetchClient'
import { ProductDetail } from '@/types/index'

// 定義 Movie 接口
interface Movie {
    id: number
    name: string
    image: string
    type: string
    rank: number
    price: number
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const {
        data: { product },
    }: { data: { product: ProductDetail } } = await fetchClient({
        method: 'GET',
        url: `api/v1/product/663a113361a0f765fc4a3759`,
    })

    const tabs = [
        {
            label: '電影介紹',
            Component: <MovieDescriptionCard movie={product} />,
        },
        {
            label: '評價',
            Component: <CommentGroup />,
        },
    ]
    return (
        <div className=" flex w-auto flex-col items-center justify-center">
            <div className="mb-96 h-80 w-full md:mb-0 md:h-full">
                <MovieDetailCard movie={product} />
            </div>
            <div className="flex w-full justify-center md:mt-0 md:w-10/12">
                <MovieDetailTab tabs={tabs} />
            </div>
        </div>
    )
}

export default Page
