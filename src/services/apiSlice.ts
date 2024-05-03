import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverCode } from '@/definitions'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ticketsystembackend-zz2vrjpjsa-de.a.run.app/',
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
            console.log('response', response)
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
