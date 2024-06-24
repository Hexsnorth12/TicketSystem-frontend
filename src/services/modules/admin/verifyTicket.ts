import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { verifyTicketPayload, IMeta, verifyTicketData } from './admin'

const verifyTicket = (
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
    build.mutation<
        verifyTicketData,
        { payload: verifyTicketPayload; token: string }
    >({
        query: ({ payload, token }) => ({
            url: `api/v1/ticket/verify`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default verifyTicket
