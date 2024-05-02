import { api } from '@/services/apiSlice'
import login from './login'

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: login(build),
    }),
})

export const { useLoginMutation } = authApi
