import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "@views/Login"
import Certificates from "@views/Certificates"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import MainLayout from "@components/MainLayout"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<Certificates />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
