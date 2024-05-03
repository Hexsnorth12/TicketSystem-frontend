import {
    EndpointBuilder,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { ISignUpBody, ISignUpData, IMeta } from './auth'

const signUp = (
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
    build.mutation<ISignUpData, ISignUpBody>({
        query: (body) => ({
            url: 'api/v1/user/sign-up',
            method: 'POST',
            body,
        }),
    })

export default signUp
