import React from "react"
import { Link } from "react-router-dom"
import { useGetCertificatesQuery } from "@app/api"
import Header from "@components/Header"

export default function Certificates() {
  const { data: certificates, isLoading } = useGetCertificatesQuery()

  return (
    <>
      <Header />
      <h1>Certificates</h1>
      {certificates?.payload.map((certificate) => {
        return (
          <div key={certificate.id}>
            <h2>{certificate.name}</h2>
            <p>{certificate.description}</p>
          </div>
        )
      })}
      <Link to={"/login"}>Login</Link>
    </>
  )
}
