import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="*"
        element={<Navigate to="/home" />}
      />
    </Routes>
  )
}