import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@app/query"

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
})
