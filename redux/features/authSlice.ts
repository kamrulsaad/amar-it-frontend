import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserState {
  username: string | null
  role: string | null
}

const initialState: IUserState = {
  username: null,
  role: null,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<IUserState>) => {
      state.username = action.payload.username
      state.role = action.payload.role
    },
  },
})

export const { userLoggedIn } = authSlice.actions

export default authSlice.reducer
