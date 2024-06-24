import { api } from '@/services/apiSlice'
import getOrders from './getOrders'
import verifyTicket from './verifyTicket'
import getTickets from './getTickets'

export const adminApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: getOrders(build),
        verifyTicket: verifyTicket(build),
        getTickets: getTickets(build),
    }),
})

export const { useGetOrdersQuery, useLazyGetOrdersQuery, useVerifyTicketMutation, useLazyGetTicketsQuery } = adminApi
