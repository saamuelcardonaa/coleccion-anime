// Componente principal de la aplicación
// Define la estructura general, rutas y layout global (modo oscuro, container principal)

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FigurasList from "./pages/FigurasList";
import FiguraDetail from "./pages/FiguraDetail";
import FiguraForm from "./pages/FiguraForm";
import Home from "./pages/Home";

function App() {
  return (
    // Layout global: fondo oscuro y texto claro
    <div className="min-vh-100 bg-dark text-light">
      {/* Navbar fija en todas las páginas */}
      <Navbar />
      {/* Contenido principal en container Bootstrap */}
      <main className="container py-4">
        {/* Definición de rutas SPA con React Router */}
        <Routes>
          {/* Redirección de la raíz a la página de inicio */}
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          {/* Página de inicio tipo hero */}
          <Route path="/inicio" element={<Home />} />
          {/* Catálogo de figuras (tabla/cards) */}
          <Route path="/figuras" element={<FigurasList />} />
          {/* Formulario para crear nueva figura */}
          <Route path="/figuras/nueva" element={<FiguraForm />} />
          {/* Formulario para editar figura existente */}
          <Route path="/figuras/editar/:id" element={<FiguraForm />} />
          {/* Detalle de figura individual */}
          <Route path="/figuras/:id" element={<FiguraDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;