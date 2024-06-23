import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { ShareCodePayload, TicketData, IMeta } from './user'

const claimTicket = (
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
    build.mutation<TicketData, { payload: ShareCodePayload; token: string }>({
        query: ({ payload, token }) => ({
            url: `api/v1/ticket/transfer/claim`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default claimTicket
