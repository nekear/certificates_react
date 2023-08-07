import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "@views/Login"
import Certificates from "@views/Certificates"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={"/"} element={<Certificates />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
