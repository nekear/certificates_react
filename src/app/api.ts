import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface PaginationResponse<T> {
  payload: T[]
  pagination: {
    totalElements: number
  }
}

interface Certificate {
  id: number
  name: string
  description: string
  price: number
  duration: number
}

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
