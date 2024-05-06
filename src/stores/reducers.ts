import { combineReducers } from 'redux'
import userSlice from './slices/userSlice'
import { api } from '@/services/apiSlice'

const rootReducer = combineReducers({
    user: userSlice.reducer,
    api: api.reducer,
})

export default rootReducer
