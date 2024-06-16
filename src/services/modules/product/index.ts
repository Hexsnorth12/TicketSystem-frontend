import { api } from '@/services/apiSlice'
import postComment from './postComment'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        postComment: postComment(build),
    }),
})

export const { usePostCommentMutation } = productApi
