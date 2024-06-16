import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { CommentPayload, IMeta, CommentData } from './product'

const postComment = (
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
    build.mutation<CommentData, { payload: CommentPayload; token: string }>({
        query: ({ payload, token }) => ({
            url: `api/v1/comment`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default postComment
