import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { InfoPayload, IMeta } from './user'

const updateInfo = (
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
    build.mutation<InfoPayload, { payload: InfoPayload; token: string }>({
        query: ({ payload, token }) => ({
            url: `api/v1/user`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default updateInfo
