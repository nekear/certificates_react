import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { Server } from "@app/types"
import { RootState } from "@app/store"

const API_URL = import.meta.env.VITE_API_URL
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig["method"]
      body?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
      useAuth?: boolean
    },
    { payload: any },
    { status: number; data: Server.Exception | undefined },
    unknown
  > =>
  async ({ url, method = "GET", body, params, useAuth = true }, api) => {
    try {
      // Getting redux store to allow extracting auth token
      const store = api.getState() as RootState

      // Get the token from your Redux state
      const token = store.auth.token

      const headers = useAuth
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}

      const result = await axios({
        url: `${API_URL}${url}`,
        method,
        data: body,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data as Server.Exception | undefined,
        },
      }
    }
  }

export const transformResponse = (r: { payload: any }) => r.payload
