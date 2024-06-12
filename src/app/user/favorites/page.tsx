import React from 'react'
import { PaginationWrapper, EmptyData } from '@/components/common'
import { MyFavorite } from '@/components/member'
import fetchClient from '@/lib/fetchClient'
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
    } = await fetchClient({
        method: 'GET',
        url: `/v1/user/favorite?limit=${8}&page=${pageIndex}`,
    })

    const renderFavorites = favorites.map((product) => (
        <MyFavorite key={product._id} product={product} />
    ))

    if (favorites.length === 0) {
        return <EmptyData message="還沒有收藏" hasButton={true} buttonMessage="前往首頁找找" resetURL="/" />
    }
    return (
        <>
            <ul className="mx-auto flex flex-wrap justify-center gap-4">
                {renderFavorites}
            </ul>
            <PaginationWrapper
                size={8}
                total={totalCount}
                withEllipsis={true}
            />
        </>
    )
}

export default Page
