import { createSlice } from '@reduxjs/toolkit'

const initialState = { token: '' }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 僅為範例用，可修改
    login(state, action) {
      state.token = action.payload as string
    },
    logout(state) {
      state.token = ''
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
