import { api } from '@/services/apiSlice'
import addFavorite from './addFavorite'
import removeFavorite from './removeFavorite'

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        addFavorite: addFavorite(build),
        removeFavorite: removeFavorite(build),
    }),
})

export const { useAddFavoriteMutation, useRemoveFavoriteMutation } = userApi
