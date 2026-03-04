// src/components/Navbar.jsx
// Componente de barra de navegación
// Aparece en todas las páginas y permite navegar a diferentes secciones

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    // Barra de navegación con Bootstrap
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        
        {/* Logo/Título de la aplicación */}
        <Link className="navbar-brand" to="/" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          🎌 Colección Anime
        </Link>

        {/* Botón hamburguesa para mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Enlace: Inicio - va al listado */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                📋 Listado
              </Link>
            </li>

            {/* Enlace: Crear - va al formulario de creación */}
            <li className="nav-item">
              <Link className="nav-link" to="/crear">
                ➕ Nueva Figura
              </Link>
            </li>

            {/* Separador visual */}
            <li className="nav-item">
              <span className="nav-link" style={{ color: '#666', cursor: 'default', userSelect: 'none' }}>
                |
              </span>
            </li>

            {/* Documentación o info */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Ver repositorio"
              >
                💻 GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
