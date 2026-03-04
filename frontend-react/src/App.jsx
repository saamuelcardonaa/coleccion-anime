// src/App.jsx
// Componente raíz de la aplicación React
// Configura React Router para navegar entre páginas

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FiguraList from './components/FiguraList';
import FiguraForm from './components/FiguraForm';
import FiguraEdit from './components/FiguraEdit';
import './App.css';

export default function App() {
  return (
    // Router: envoltorio que habilita React Router en toda la app
    <Router>
      {/* Navbar: barra de navegación visible en todas las páginas */}
      <Navbar />

      {/* Routes: contenedor de rutas */}
      <Routes>
        {/* Ruta 1: Página principal - Listado de figuras */}
        <Route path="/" element={<FiguraList />} />

        {/* Ruta 2: Crear nueva figura */}
        <Route path="/crear" element={<FiguraForm />} />

        {/* Ruta 3: Editar figura existente (con ID dinámico) */}
        <Route path="/editar/:id" element={<FiguraEdit />} />
      </Routes>
    </Router>
  );
}
