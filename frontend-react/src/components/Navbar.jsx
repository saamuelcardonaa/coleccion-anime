import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Colección Anime</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Listado</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nueva">Nueva Figura</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
