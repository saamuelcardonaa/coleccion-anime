import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/figuras">
          <i className="bi bi-collection me-2"></i>
          Colección Anime
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/inicio" className="nav-link">
                <i className="bi bi-house me-1"></i>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/figuras" className="nav-link">
                <i className="bi bi-table me-1"></i>
                Listado
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/figuras/nueva" className="nav-link">
                <i className="bi bi-plus-circle me-1"></i>
                Nueva Figura
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
