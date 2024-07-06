import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { IMeta } from './user'
import { ShareOrder } from '@/types/product'

const getShareTickets = (
    build: EndpointBuilder<
        BaseQueryFn<
            string | FetchArgs,
            unknown,
            FetchBaseQueryError,
            IMeta,
            FetchBaseQueryMeta
        >,
        never,
        'api'
    >,
) =>
    build.query<ShareOrder[], { token: string; isPublished: boolean }>({
        query: ({ token, isPublished }) => ({
            url: `api/v1/user/share-tickets?isPublished=${isPublished}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default getShareTickets
