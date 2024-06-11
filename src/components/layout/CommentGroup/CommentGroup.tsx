import React from 'react'
import { CommentCard } from '@components/common'

import fetchClient from '@/lib/fetchClient'
import { PaginationWrapper } from '@/components/common'
import { Comment } from '@/types'

interface Props {
    productId: string
    searchParams?: { [key: string]: string }
}

const Page: React.FC<Props> = async ({ productId, searchParams }) => {
    const pageIndex = searchParams?.page ? parseInt(searchParams.page) : 1
    const {
        data: { comments, totalCount, page },
    }: { data: { comments: Comment[]; totalCount: number; page: number } } =
        await fetchClient({
            method: 'GET',
            url: `api/v1/comment?limit=${10}&page=${pageIndex}&status=active&productIds=${productId}`,
        })
    console.log('Page', page)
    return (
        <>
            <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                {comments.map((comment) => (
                    <CommentCard
                        key={comment._id}
                        avatar={comment.user.avatarPath}
                        userName={comment.user.account}
                        comment={comment.content}
                        stars={comment.rating}
                    />
                ))}
            </div>
            <PaginationWrapper
                page={pageIndex}
                size={5}
                total={totalCount}
                withEllipsis={true}
            />
        </>
    )
}

export default Page
