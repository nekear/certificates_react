// === Entities types ===
import { Dayjs } from "dayjs"

export namespace Entities {
  export interface Certificate {
    id: number
    name: string
    description: string
    price: number
    duration: number
    createDate: Dayjs
    updateDate: Dayjs
    tags: Tag[]
  }

  export interface User {
    username: string
    role: string
    about: string
  }

  export interface Tag {
    id: number
    name: string
  }
}

// === Everything related to redux state ===
export namespace Redux {
  export interface AuthState {
    user?: Entities.User
    token?: string
    isAuthenticated: boolean
  }

  export type AuthPayload = Omit<AuthState, "isAuthenticated">
}

// === Everything related to http requests ===
export namespace Server {
  // Because of the arch simplicity, we can use the same type for both redux state and api response
  export type LoginResponse = Redux.AuthPayload

  export type LoginRequest = {
    username: string
    password: string
  }

  export interface Pagination<T> {
    payload: T[]
    pagination: {
      totalElements: number
    }
  }

  export interface Exception {
    code: number
    message: string
  }
}
