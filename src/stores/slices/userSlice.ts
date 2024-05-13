import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types'

const initialState: User = { account: '', email: '', token: '' }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 僅為範例用，可修改
        login(state, action) {
            const { account, email, token } = action.payload
            state.token = token as string
            state.account = account as string
            state.email = email as string
        },
        logout(state) {
            state.token = ''
        },
    },
})

export const userActions = userSlice.actions
export default userSlice
