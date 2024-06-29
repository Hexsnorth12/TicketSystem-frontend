import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { TransferPayload, TransferCodeData, IMeta } from './product'

const getTransferCode = (
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
    build.query<TransferCodeData, { payload: TransferPayload; token: string }>({
        query: ({ payload, token }) => ({
            url: `api/v1/ticket/transfer/createCode`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default getTransferCode
