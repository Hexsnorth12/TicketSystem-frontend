import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import { api } from '@/services/apiSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
