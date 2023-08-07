import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { ServerError } from "@app/types"

const API_URL = import.meta.env.VITE_API_URL
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig["method"]
      body?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
      isSecure?: boolean
    },
    { payload: any },
    { status: number; data: ServerError | undefined },
    unknown
  > =>
  async ({ url, method = "GET", body, params, isSecure = true }) => {
    try {
      // TODO: add securing header
      const result = await axios({
        url: `${API_URL}${url}`,
        method,
        data: body,
        params,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data as ServerError | undefined,
        },
      }
    }
  }

export const transformResponse = (r: { payload: any }) => r.payload
