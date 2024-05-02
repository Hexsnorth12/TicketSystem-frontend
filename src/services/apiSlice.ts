import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ticketsystembackend-zz2vrjpjsa-de.a.run.app/',
        prepareHeaders: (headers) => {
            // const token = getState().user.token
            // if (token) {
            //     headers.set('Authorization', `Bearer ${token}`)
            // }
            // headers.set('Content-Type', `application/json`)
            return headers
        },
        timeout: 20000,
    }),
    endpoints: () => ({}),
})
