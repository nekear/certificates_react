import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Certificate, PaginationResponse } from "@app/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    getCertificates: builder.query<PaginationResponse<Certificate>, void>({
      query: () => "/certificates",
    }),
  }),
})

export const { useGetCertificatesQuery } = api
