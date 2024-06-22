import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { SellPayload, IMeta, CommentData } from './product'

const postSellTicket = (
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
    build.mutation<CommentData, { payload: SellPayload; token: string }>({
        query: ({ payload, token }) => ({
            url: `api/v1/user/sell-ticket`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default postSellTicket
