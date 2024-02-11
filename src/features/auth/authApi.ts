import { api } from "@app/api"
import { Server } from "@app/types"

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Server.LoginResponse, Server.LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        useAuth: false,
      }),
      invalidatesTags: ["Certificate"],
    }),

    register: build.mutation<void, Server.RegistrationRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
        useAuth: false,
      }),
    }),

    getMe: build.query<Server.MeResponse, void>({
      query: (credentials) => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
} = authApi
