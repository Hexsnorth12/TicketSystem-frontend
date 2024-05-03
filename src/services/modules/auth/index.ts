import { api } from '@/services/apiSlice'
import login from './login'
import signUp from './signUp'

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: login(build),
        signUp: signUp(build),
    }),
})

export const { useLoginMutation, useSignUpMutation } = authApi
