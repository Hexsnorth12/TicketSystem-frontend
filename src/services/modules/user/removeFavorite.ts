import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { UpdateFavoriteData, IMeta } from './user'

const removeFavorite = (
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
    build.mutation<UpdateFavoriteData, { productId: string; token: string }>({
        query: ({ productId, token }) => ({
            url: `api/v1/user/favorite/${productId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    })

export default removeFavorite
