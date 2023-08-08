import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "@views/Login"
import Certificates from "@views/Certificates"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import MainLayout from "@components/MainLayout"
import PrivateRoute from "@components/PrivateRoute"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Protected routes */}
          <Route
            path={"/"}
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Certificates />} />
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
