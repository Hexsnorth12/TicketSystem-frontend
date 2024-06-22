import React from 'react'
import { MyComment } from '@/components/member'
import { EmptyData, PaginationWrapper } from '@/components/common'
import fetchServer from '@/lib/fetchServer'
import { SelfComment } from '@/types'

interface PageProps {
    searchParams?: { [key: string]: string }
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const pageIndex = searchParams?.page ? parseInt(searchParams.page) : 1

    const {
        data: { comments, totalCount },
    }: { data: { comments: SelfComment[]; totalCount: number; page: number } } =
        await fetchServer({
            method: 'GET',
            url: `api/v1/comment?limit=${8}&page=${pageIndex}&status=active`,
        })
    if (comments.length === 0) {
        return <EmptyData message="尚無評論" hasButton={false} />
    }
    return (
        <section className="flex h-full flex-col">
            <div className="grow">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {comments.map((comment) => (
                        <div key={comment._id} className="">
                            <MyComment
                                productName={comment.product.title}
                                starts={comment.rating}
                                comment={comment.content}
                                photoPath={comment.product.photoPath}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
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
