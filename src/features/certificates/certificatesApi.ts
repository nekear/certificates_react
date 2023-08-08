import { Entities, Server } from "@app/types"
import { api } from "@app/api"
import dayjs from "dayjs"

export const certificatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<
      Server.Pagination<Entities.Certificate>,
      void
    >({
      query: () => ({
        url: "/certificates",
      }),
      transformResponse: (
        response: Server.Pagination<Entities.Certificate>,
      ) => {
        // Transforming original response to parse dates into dayjs objects
        return {
          payload: response.payload.map(
            (certificate: Entities.Certificate) => ({
              ...certificate,
              createDate: dayjs(certificate.createDate),
              updateDate: dayjs(certificate.updateDate),
            }),
          ),
          pagination: response.pagination,
        }
      },
    }),
  }),
})

export const { useGetCertificatesQuery } = certificatesApi
