import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Redux } from "@app/types"

export const authSlice = createSlice({
  name: "auth",
  initialState: {} as Redux.AuthState,
  reducers: {
    authenticate: (state, action: PayloadAction<Redux.AuthPayload>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = undefined
      state.token = undefined
      state.isAuthenticated = false
    },
  },
})

export const { authenticate, logout } = authSlice.actions

export default authSlice.reducer
