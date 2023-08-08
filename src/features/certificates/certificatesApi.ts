import { Entities, Server } from "@app/types"
import { api } from "@app/api"

export const certificatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<
      Server.Pagination<Entities.Certificate>,
      Server.Certificates.Request
    >({
      query: (args) => ({
        url: "/certificates",
        body: args,
        method: "OPTIONS",
      }),
    }),
  }),
})

export const { useGetCertificatesQuery } = certificatesApi
