import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "@views/Login"
import Certificates from "@views/Certificates"
import MainLayout from "@components/MainLayout"
import PrivateRoute from "@components/PrivateRoute"
import Registration from "@views/Registration";

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

          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
