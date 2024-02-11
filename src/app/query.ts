import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { RootState } from "@app/store"

const API_URL = import.meta.env.VITE_API_URL

export type FetchServerError = {
  status: number
  message: string
}

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
    FetchServerError,
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
      const err = axiosError as AxiosError as AxiosError<{status: number, detail: string}>
      return {
        error: {
          status: err.response?.data.status ?? 500,
          message: err.response?.data.detail ?? err.message,
        },
      }
    }
  }

export const transformResponse = (r: { payload: any }) => r.payload



/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is FetchServerError {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string" &&
    "status" in error
  )
}
