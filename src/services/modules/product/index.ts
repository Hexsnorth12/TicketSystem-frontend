import { api } from '@/services/apiSlice'
import postComment from './postComment'
import getTransferCode from './getTransferCode'
import postSellTicket from './postSellTicket'
import getProducts from './getProducts'
import createProduct from './createProduct'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        postComment: postComment(build),
        getTransferCode: getTransferCode(build),
        postSellTicket: postSellTicket(build),
        getProducts: getProducts(build),
        createProduct: createProduct(build),
    }),
})

export const {
    usePostCommentMutation,
    useGetTransferCodeQuery,
    usePostSellTicketMutation,
    useLazyGetProductsQuery,
    useCreateProductMutation,
} = productApi
