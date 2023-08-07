import { api } from "../../app/api"
import { LoginRequest, LoginResponse } from "../../app/types"

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
