// === Entities types ===

import { Dayjs } from "dayjs"

export namespace Entities {
  export namespace Certificate {
    interface Main {
      id: number
      name: string
      description: string
      price: number
      duration: number
      tags: Tag[]
    }

    export interface Raw extends Main {
      createDate: string
      updateDate: string
    }

    export interface Adapted extends Main {
      createDate: Dayjs
      updateDate: Dayjs
    }
  }

  export interface User {
    username: string
    role: Role
  }

  export interface Tag {
    id: number
    name: string
  }

  export type Role = "ADMIN" | "USER"
}

// === Everything related to redux state ===
export namespace Redux {
  export interface AuthState {
    user?: Entities.User
    token?: string
    isAuthenticated: boolean
  }

  export type AuthPayload = Omit<AuthState, "isAuthenticated" | "user">
  export type SetUserPayload = Entities.User;
}

// === Everything related to http requests ===
export namespace Server {
  // Because of the arch simplicity, we can use the same type for both redux state and api response
  export type LoginResponse = { token: string; }

  export type LoginRequest = {
    username: string
    password: string
  }

  export type RegistrationRequest = {
    username: string
    password: string
  }

  export type MeResponse = {
    username: string
    role: Entities.Role
  }

  export interface Pagination<T> {
    payload: T[]
    pagination: {
      totalElements: number
    }
  }

  export namespace Certificates {
    interface Filters {
      main: string
    }

    interface Pagination {
      askedPage: number
      elementsPerPage: number
    }

    export interface Sorting {
      column: "name" | "date"
      direction: "ASC" | "DESC"
    }

    export interface Request {
      filters: Filters
      pagination: Pagination
      sorting: Sorting[]
    }

    export namespace DTO {
      export interface Create {
        name: string
        description: string
        price: number
        duration: number
        tags: { name: string }[]
      }

      export type Update = Create
    }
  }

  export interface Exception {
    code: number
    message: string
  }
}
