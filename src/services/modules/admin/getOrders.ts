import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { OrderData, OrderPayload, IMeta } from './admin'

const getOrders = (
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
    build.query<OrderData, { params: string; token: string }>({
        query: ({ params, token }) => ({
            url: `api/v1/order?${params}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default getOrders
