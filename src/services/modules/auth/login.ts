import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import Auth from './auth'

const login = (
    build: EndpointBuilder<
        BaseQueryFn<
            string | FetchArgs,
            unknown,
            FetchBaseQueryError,
            any,
            FetchBaseQueryMeta
        >,
        never,
        'api'
    >,
) =>
    build.mutation<Auth.ILogin, any>({
        query: (body) => ({
            url: 'api/v1/user/login',
            method: 'POST',
            body,
        }),
    })

export default login
