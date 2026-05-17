import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import Login from "../pages/Login";

import { MainLayout } from "../components/MainLayout";
import { TambahBerkas } from "../pages/TambahBerkas";
import { TrackingDetail } from "../pages/TrackingDetail";
import { DashboardCamat } from "../pages/DashboardCamat";
import { DashboardKepalaDinas } from "../pages/DashboardKepalaDinas";
import { DashboardDinas } from "../pages/DashboardDinas";
import { DashboardBiroOrganisasi } from "../pages/DashboardBiroOrganisasi";
import { PenaltiSaya } from "../pages/PenaltiSaya";
import { Notifikasi } from "../pages/Notifikasi";
import { Profil } from "../pages/Profil";
import { AturanSLA } from "../pages/AturanSLA";
import { SearchResults } from "../pages/SearchResults";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/tambah-berkas" element={<TambahBerkas />} />
        <Route path="/tracking/:id" element={<TrackingDetail />} />
        <Route path="/tracking-dinas/:id" element={<TrackingDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/camat" element={<DashboardCamat />} />
        <Route path="/dinas" element={<DashboardDinas />} />
        <Route path="/kepala-dinas" element={<DashboardKepalaDinas />} />
        <Route path="/biro-organisasi" element={<DashboardBiroOrganisasi />} />
        <Route path="/penalti" element={<PenaltiSaya />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/aturan-sla" element={<AturanSLA />} />
      </Route>
      
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}