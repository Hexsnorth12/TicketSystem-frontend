import { api } from '@/services/apiSlice'
import postComment from './postComment'
import getTransferCode from './getTransferCode'
import postSellTicket from './postSellTicket'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        postComment: postComment(build),
        getTransferCode: getTransferCode(build),
        postSellTicket: postSellTicket(build)
    }),
})

export const { usePostCommentMutation, useGetTransferCodeQuery, usePostSellTicketMutation } = productApi
