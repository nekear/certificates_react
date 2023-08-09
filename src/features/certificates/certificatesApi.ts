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
        useAuth: false,
      }),
      providesTags: (result) => [{ type: "Certificate", id: "LIST" }],
    }),

    createCertificate: builder.mutation<
      Entities.Certificate,
      Server.Certificates.DTO.Create
    >({
      query: (args) => ({
        url: "/certificates",
        body: args,
        method: "POST",
      }),
      invalidatesTags: (result) => [{ type: "Certificate", id: "LIST" }],
    }),
  }),
})

export const { useGetCertificatesQuery, useCreateCertificateMutation } =
  certificatesApi
