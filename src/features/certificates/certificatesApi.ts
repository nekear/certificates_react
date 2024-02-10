import { Entities, Server } from "@app/types"
import { api } from "@app/api"
import { serializeNestedObjects } from "@app/query";

export const certificatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<
      Server.Pagination<Entities.Certificate.Raw>,
      Server.Certificates.Request
    >({
      query: (args) => ({
        url: "/certificates",
        params: serializeNestedObjects({
          // filters: args.filters.main.length ? args.filters : undefined,
          pagination: args.pagination,
          sorting: args.sorting,
        }),
        method: "GET",
      }),
      // Providing tags by mapping result payload
      providesTags: (result) =>
        result?.payload
          ? [
              ...result.payload.map((c) => ({
                type: "Certificate" as const,
                id: c.id,
              })),
              { type: "Certificate", id: "LIST" },
            ]
          : [{ type: "Certificate", id: "LIST" }],
    }),

    createCertificate: builder.mutation<
      Entities.Certificate.Raw,
      Server.Certificates.DTO.Create
    >({
      query: (args) => ({
        url: "/certificates",
        body: args,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Certificate", id: "LIST" }],
    }),

    updateCertificate: builder.mutation<
      Entities.Certificate.Raw,
      Server.Certificates.DTO.Update & { id: number }
    >({
      query: ({ id, ...args }) => ({
        url: `/certificates/${id}`,
        body: args,
        method: "PUT",
      }),
      invalidatesTags: (result, _, args) => [
        { type: "Certificate", id: args.id },
      ],
    }),

    deleteCertificate: builder.mutation<void, number>({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, _, id) => [{ type: "Certificate", id }],
    }),
  }),
})

export const {
  useGetCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = certificatesApi
