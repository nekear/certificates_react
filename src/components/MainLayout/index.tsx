import React from "react"
import Header from "@components/Header"
import { Outlet } from "react-router-dom"
import { Container } from "@chakra-ui/react"

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container
        maxW={"4xl"}
        bg={"#fff"}
        borderColor={"gray.200"}
        borderWidth={1}
        borderRadius={"md"}
        marginTop={4}
        padding={4}
      >
        <Outlet />
      </Container>
    </>
  )
}
