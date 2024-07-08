import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { Product, IMeta } from './product'

const getProducts = (
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
    build.query<
        {
            products: Product[]
            limit: number
            page: number
            totalCount: number
        },
        { title: string; token: string }
    >({
        query: ({ title, token }) => ({
            url: `api/v1/product?limit=20&page=1&isPublic=true&title=${title}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default getProducts
