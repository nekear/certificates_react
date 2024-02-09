import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Redux } from "@app/types"

export const authSlice = createSlice({
  name: "auth",
  initialState: {} as Redux.AuthState,
  reducers: {
    authenticate: (state, action: PayloadAction<Redux.AuthPayload>) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    setUser: (state, action: PayloadAction<Redux.SetUserPayload>) => {
      state.user = action.payload
    },

    logout: (state) => {
      state.user = undefined
      state.token = undefined
      state.isAuthenticated = false
    },
  },
})

export const { authenticate, setUser, logout } = authSlice.actions

export default authSlice.reducer
