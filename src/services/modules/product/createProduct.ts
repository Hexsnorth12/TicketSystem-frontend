import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { NewProduct, IMeta } from './product'

const createProduct = (
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
        NewProduct[],
        { payload: { products: NewProduct[] }; token: string }
    >({
        query: ({ payload, token }) => ({
            url: `api/v1/product`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        }),
    })

export default createProduct
