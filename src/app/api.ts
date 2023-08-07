import { createApi } from "@reduxjs/toolkit/query/react"
import { Certificate, PaginationResponse } from "@app/types"
import { axiosBaseQuery } from "@app/query"

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCertificates: builder.query<PaginationResponse<Certificate>, void>({
      query: () => ({
        url: "/certificates",
      }),
    }),
  }),
})

export const { useGetCertificatesQuery } = api
