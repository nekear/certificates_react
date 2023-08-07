import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "@views/Login"
import Certificates from "@views/Certificates"



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={"/"} element={<Certificates />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
