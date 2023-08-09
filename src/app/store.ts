import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api"
import { authSlice } from "@features/auth/authSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistedAuthReducer = persistReducer(
  {
    key: "auth",
    storage,
  },
  authSlice.reducer,
)

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
