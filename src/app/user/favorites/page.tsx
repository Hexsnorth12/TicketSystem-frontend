import React from 'react'
import { PaginationWrapper, EmptyData } from '@/components/common'
import { MyFavorite } from '@/components/member'
import fetchServer from '@/lib/fetchServer'
import { ProductFavorite } from '@/types'

interface pageProps {
    searchParams?: { [key: string]: string }
}

const Page: React.FC<pageProps> = async ({ searchParams }) => {
    const pageIndex = searchParams?.page ? parseInt(searchParams.page) : 1
    const {
        data: { favorites, totalCount },
    }: {
        data: { favorites: ProductFavorite[]; totalCount: number; page: number }
    } = await fetchServer({
        method: 'GET',
        url: `api/v1/user/favorite?limit=${8}&page=${pageIndex}`,
    })

    const renderFavorites = favorites.map((product) => (
        <MyFavorite key={product._id} product={product} />
    ))
    console.log('favorites', favorites)
    if (favorites.length === 0) {
        return (
            <EmptyData
                message="還沒有收藏"
                hasButton={true}
                buttonMessage="前往首頁找找"
                resetURL="/"
            />
        )
    }
    return (
        <section className="j flex h-full flex-col border">
            <ul className="flex grow flex-wrap items-start justify-center gap-4 md:justify-start">
                {renderFavorites}
            </ul>
            <div className="mx-auto">
                <PaginationWrapper
                    size={8}
                    total={totalCount}
                    withEllipsis={true}
                />
            </div>
        </section>
    )
}

export default Page
