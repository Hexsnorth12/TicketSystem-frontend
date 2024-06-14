import React from 'react'
import { MyComment } from '@/components/member'
import { EmptyData, PaginationWrapper } from '@/components/common'
import fetchClient from '@/lib/fetchClient'
import { getUserSession } from '@/lib/auth.actions'
import { SelfComment } from '@/types'

interface PageProps {
    searchParams?: { [key: string]: string }
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const { session } = await getUserSession()

    const pageIndex = searchParams?.page ? parseInt(searchParams.page) : 1

    const {
        data: { comments, totalCount },
    }: { data: { comments: SelfComment[]; totalCount: number; page: number } } =
        await fetchClient({
            method: 'GET',
            url: `api/v1/comment?limit=${10}&page=${pageIndex}&status=active`,
            token: session?.accessToken,
        })

    if (comments.length === 0) {
        return <EmptyData message="尚無評論" hasButton={false} />
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {comments.map((comment) => (
                <div key={comment._id} className="">
                    <MyComment
                        productName={comment.title}
                        starts={comment.rating}
                        comment={comment.content}
                        photoPath={comment.photoPath}
                    />
                </div>
            ))}
            {/* <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div>
            <div className="">
                <MyComment
                    productName="沙丘：帝國"
                    starts={3}
                    comment="太空中最珍貴的資源，就是電影所謂的「香料"
                />
            </div>
            <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div>
            <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div> */}
            <div className="mx-auto">
                <PaginationWrapper
                    size={8}
                    total={totalCount}
                    withEllipsis={true}
                />
            </div>
        </div>
    )
}

export default Page
