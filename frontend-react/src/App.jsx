import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FigurasList from "./pages/FigurasList";
import FiguraDetail from "./pages/FiguraDetail";
import FiguraForm from "./pages/FiguraForm";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-vh-100 bg-dark text-light">
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/figuras" element={<FigurasList />} />
          <Route path="/figuras/nueva" element={<FiguraForm />} />
          <Route path="/figuras/editar/:id" element={<FiguraForm />} />
          <Route path="/figuras/:id" element={<FiguraDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;