// Página de inicio tipo "hero"
// Presenta la app, acceso rápido al catálogo y resumen de tecnologías usadas

import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    // Hero principal: fondo oscuro, texto centrado, icono y botones
    <div className="bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
      <div className="text-center mb-5">
        {/* Icono principal y título */}
        <i className="bi bi-collection display-1 mb-3"></i>
        <h1 className="display-3 fw-bold mb-3">Colección Anime</h1>
        <p className="lead mb-4">Aplicación CRUD completa consumiendo la misma API REST</p>
        {/* Botones de acceso rápido */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <Link to="/figuras" className="btn btn-primary btn-lg">
            <i className="bi bi-collection me-2"></i>
            Ver catálogo
          </Link>
          <Link to="/figuras/nueva" className="btn btn-success btn-lg">
            <i className="bi bi-plus-circle me-2"></i>
            Añadir figura
          </Link>
        </div>
      </div>
      {/* Cards informativas sobre la arquitectura y tecnologías */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
          <div className="col">
            <div className="card bg-secondary text-light h-100 text-center p-4">
              <div className="mb-3">
                <i className="bi bi-database display-4"></i>
              </div>
              <h5 className="card-title">MongoDB + API REST</h5>
              <p className="card-text">Backend desplegado en Vercel con Node.js y MongoDB Atlas.</p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-secondary text-light h-100 text-center p-4">
              <div className="mb-3">
                <i className="bi bi-pencil-square display-4"></i>
              </div>
              <h5 className="card-title">Operaciones CRUD</h5>
              <p className="card-text">Crear, editar, eliminar y visualizar figuras.</p>
            </div>
          </div>
          <div className="col">
            <div className="card bg-secondary text-light h-100 text-center p-4">
              <div className="mb-3">
                <i className="bi bi-lightning-charge display-4"></i>
              </div>
              <h5 className="card-title">React + Hooks</h5>
              <p className="card-text">Aplicación construida con React, Fetch API y React Router.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
