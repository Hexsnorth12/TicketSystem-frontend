import { api } from '@/services/apiSlice'
import postComment from './postComment'
import getTransferCode from './getTransferCode'
import postSellTicket from './postSellTicket'
import createProduct from './createProduct'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        postComment: postComment(build),
        getTransferCode: getTransferCode(build),
        postSellTicket: postSellTicket(build),
        createProduct: createProduct(build),
    }),
})

export const {
    usePostCommentMutation,
    useGetTransferCodeQuery,
    usePostSellTicketMutation,
    useCreateProductMutation,
} = productApi
