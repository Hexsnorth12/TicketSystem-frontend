import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { TicketsData, IMeta } from './admin'

const getTickets = (
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
    build.query<TicketsData, { params: string; token: string }>({
        query: ({ params, token }) => ({
            url: `api/v1/ticket?${params}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default getTickets
