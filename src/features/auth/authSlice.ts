import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthState } from "@app/types"

export const authSlice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = undefined
      state.token = undefined
    },
  },
})

export const { authenticate, logout } = authSlice.actions

export default authSlice.reducer
