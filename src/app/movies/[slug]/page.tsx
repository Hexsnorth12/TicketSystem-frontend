import MovieDetailCard from '@/components/common/Card/MovieDetail'
import MovieDetailTab from '@components/common/Tab/movieDetail'
import CommentGroup from '@components/layout/CommentGroup/CommentGroup'
import * as React from 'react'
import MovieDescriptionCard from '@/components/common/Card/MovieDescription'
import fetchServer from '@/lib/fetchServer'
import { ProductDetail } from '@/types/index'

// 定義 Movie 接口

const Page = async ({ params }: { params: { slug: string } }) => {
    const { data }: { data: ProductDetail } = await fetchServer({
        method: 'GET',
        url: `api/v1/product/${params.slug}`,
    })

    const tabs = [
        {
            label: '電影介紹',
            Component: <MovieDescriptionCard product={data} />,
        },
        {
            label: '評價',
            Component: <CommentGroup productId={params.slug} />,
        },
    ]

    return (
        <div className=" flex w-auto flex-col items-center justify-center">
            <div className="mb-96 h-80 w-full md:mb-0 md:h-full">
                <MovieDetailCard product={data} />
            </div>
            <div className="flex w-full justify-center md:mt-0 md:w-10/12">
                <MovieDetailTab tabs={tabs} />
            </div>
        </div>
    )
}

export default Page
