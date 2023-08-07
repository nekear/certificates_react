import React from "react"
import { useGetCertificatesQuery } from "./app/api"

export default function App() {
  const { data, isLoading } = useGetCertificatesQuery()

  return (
    <>
      {data?.payload.map((cert) => {
        return (
          <div key={cert.id}>
            <h1>{cert.name}</h1>
            <p>{cert.description}</p>
          </div>
        )
      })}
    </>
  )
}