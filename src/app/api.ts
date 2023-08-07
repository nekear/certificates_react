import { createApi } from "@reduxjs/toolkit/query/react"
import { Entities, Server } from "@app/types"
import { axiosBaseQuery } from "@app/query"

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCertificates: builder.query<
      Server.Pagination<Entities.Certificate>,
      void
    >({
      query: () => ({
        url: "/certificates",
      }),
    }),
  }),
})

export const { useGetCertificatesQuery } = api
