import React from 'react'
import { PaginationWrapper, EmptyData } from '@/components/common'
import { MyFavorite } from '@/components/member'
import fetchServer from '@/lib/fetchServer'
import { ProductFavorite } from '@/types'

const PAGE_SIZE = 6

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
        url: `api/v1/user/favorite?limit=${PAGE_SIZE}&page=${pageIndex}`,
    })

    const renderFavorites = favorites.map((product) => (
        <MyFavorite key={product._id} product={product} />
    ))

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
        <section className="flex h-full flex-col">
            <ul className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-3">
                {renderFavorites}
            </ul>
            <div className="mx-auto">
                <PaginationWrapper
                    size={PAGE_SIZE}
                    total={totalCount}
                    withEllipsis={true}
                />
            </div>
        </section>
    )
}

export default Page
