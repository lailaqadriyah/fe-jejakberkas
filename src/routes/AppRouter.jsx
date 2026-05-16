import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import Login from "../pages/Login";

import { MainLayout } from "../components/MainLayout";
import { TambahBerkas } from "../pages/TambahBerkas";
import { TrackingDetail } from "../pages/TrackingDetail";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tambah-berkas" element={<TambahBerkas />} />
        <Route path="/tracking/:id" element={<TrackingDetail />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />
    </Routes>
  )
}