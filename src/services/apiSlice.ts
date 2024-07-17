import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverCode, BASE_URL } from '@/definitions'

// next api endpoint
export const nextApi = createApi({
    reducerPath: 'nextApi',
    baseQuery: fetchBaseQuery({
        responseHandler: async (response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    const { status, message, data: result } = data
                    // server 自定義錯誤
                    if (status !== serverCode.SUCCESS) {
                        return Promise.reject(new Error(message))
                    }
                    return result
                })
            } else {
                // http status code error
                return response.json().then((error) => {
                    console.log('error', error)
                    const { status, message } = error
                    return { status, message }
                })
            }
        },
    }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (body) => ({
                url: 'api/sign-in',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.query({
            query: () => ({
                url: 'api/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useSignInMutation, useLazyLogoutQuery } = nextApi

// backend api endpoint
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // TODO: 有需要改headers再處理
            // const token = getState().user.token
            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`)
            // }
            // headers.set('Content-Type', `application/json`)
            return headers
        },
        timeout: 20000,
        responseHandler: async (response) => {
            if (response.status === 200) {
                return response.json().then((data) => {
                    const { status, message, data: result } = data
                    // server 自定義錯誤
                    if (status !== serverCode.SUCCESS) {
                        return Promise.reject(new Error(message))
                    }
                    return result
                })
            } else {
                // http status code error
                return response.json().then((error) => {
                    return Promise.reject(error)
                })
            }
        },
    }),
    endpoints: () => ({}),
})
