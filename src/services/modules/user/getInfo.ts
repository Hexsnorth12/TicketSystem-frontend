import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { InfoPayload, IMeta } from './user'

const getInfo = (
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
    build.query<InfoPayload, { token: string }>({
        query: ({ token }) => ({
            url: `api/v1/user`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default getInfo
