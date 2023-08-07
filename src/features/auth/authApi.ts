import { api } from "@app/api"
import { Server } from "@app/types"

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Server.LoginResponse, Server.LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
