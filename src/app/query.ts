import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosError, AxiosRequestConfig } from "axios"

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
    unknown,
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
        // TODO: update error structure according to the project standard
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const transformResponse = (r: { payload: any }) => r.payload
