import { api } from "@app/api"
import { Server } from "@app/types"

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Server.LoginResponse, Server.LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        useAuth: false,
      }),
    }),

    register: build.mutation<void, Server.RegistrationRequest>({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
        useAuth: false,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
