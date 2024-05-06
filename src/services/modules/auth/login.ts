import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { ILoginBody, ILoginData, IMeta } from './auth'

const login = (
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
    build.mutation<ILoginData, ILoginBody>({
        query: (body) => ({
            url: 'api/v1/user/login',
            method: 'POST',
            body,
        }),
    })

export default login
