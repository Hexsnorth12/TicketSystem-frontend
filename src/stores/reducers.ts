import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import { api, nextApi } from '@/services/apiSlice'

const rootReducer = combineReducers({
    user: userSlice.reducer,
    api: api.reducer,
    nextApi: nextApi.reducer,
})

export default rootReducer
