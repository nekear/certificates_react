import React, { PropsWithChildren } from "react"
import { useAppSelector } from "@app/hooks"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }: PropsWithChildren) {
  const authState = useAppSelector((state) => state.auth)

  if (!authState.isAuthenticated) return <Navigate to={"/login"} replace />

  return children
}
