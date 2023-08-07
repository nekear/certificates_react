export interface User {
  username: string
  role: string
  about: string
}

export interface AuthState {
  token?: string
  user?: User
}

// Because of the arch simplicity, we can use the same type for both redux state and api response
export type LoginResponse = AuthState

export type LoginRequest = {
  username: string
  password: string
}
