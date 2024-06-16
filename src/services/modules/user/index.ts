import { api } from '@/services/apiSlice'
import addFavorite from './addFavorite'
import removeFavorite from './removeFavorite'
import updateInfo from './updateInfo'
import getInfo from './getInfo'

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        addFavorite: addFavorite(build),
        removeFavorite: removeFavorite(build),
        updateInfo: updateInfo(build),
        getInfo: getInfo(build),
    }),
})

export const {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    useUpdateInfoMutation,
    useLazyGetInfoQuery
} = userApi
