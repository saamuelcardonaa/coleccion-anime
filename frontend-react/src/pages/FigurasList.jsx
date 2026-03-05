// Página de catálogo de figuras
// Permite buscar, filtrar, ver en tabla o cards, y paginar resultados

import React, { useEffect, useState } from "react";
import { getAll, remove } from "../services/figurasApi";
import { Link, useNavigate } from "react-router-dom";

export default function FigurasList() {
  // Estados principales: datos, loading, errores, vista, filtros y paginación
  const [figuras, setFiguras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [view, setView] = useState("table"); // "table" | "cards"
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Carga inicial de datos desde la API
  useEffect(() => {
    setLoading(true);
    setError("");
    getAll()
      .then((data) => {
        setFiguras(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar figuras.");
        setLoading(false);
      });
  }, []);

  // Filtro por texto (nombre, anime, personaje)
  const filtered = figuras.filter(f =>
    f.nombre.toLowerCase().includes(search.toLowerCase()) ||
    f.anime.toLowerCase().includes(search.toLowerCase()) ||
    f.personaje.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación client-side
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Cambio de página
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Eliminar figura con feedback
  const handleDelete = async (id) => {
    setError("");
    setSuccessMsg("");
    try {
      await remove(id);
      setFiguras((prev) => prev.filter((f) => f._id !== id));
      setSuccessMsg("Figura eliminada correctamente.");
    } catch {
      setError("No se pudo eliminar la figura.");
    }
  };

  // Reset de página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [pageSize, search]);

  return (
    <div>
      {/* Header y toggle de vista (tabla/cards) */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Figuras</h2>
        <div>
          {/* Botones para cambiar entre vista tabla y cards */}
          <button
            className={`btn btn-outline-light me-2 ${view === "table" ? "active" : ""}`}
            onClick={() => setView("table")}
            title="Vista Tabla"
          >
            <i className="bi bi-table"></i>
          </button>
          <button
            className={`btn btn-outline-light ${view === "cards" ? "active" : ""}`}
            onClick={() => setView("cards")}
            title="Vista Cards"
          >
            <i className="bi bi-grid-3x3-gap"></i>
          </button>
          <Link to="/figuras/nueva" className="btn btn-primary ms-3">
            <i className="bi bi-plus-circle me-1"></i>
            Nueva Figura
          </Link>
        </div>
      </div>

      {/* Panel de filtros y contador */}
      <div className="card bg-secondary text-light mb-3 shadow-sm">
        <div className="card-body row align-items-center g-2">
          <div className="col-12 col-md-5 mb-2 mb-md-0">
            {/* Input de búsqueda */}
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre, anime o personaje"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-6 col-md-3">
            {/* Selector de cantidad por página */}
            <select
              className="form-select"
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              <option value={8}>8 por página</option>
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
            </select>
          </div>
          <div className="col-6 col-md-4 text-end">
            {/* Contador de resultados */}
            <span className="badge bg-dark fs-6">
              {filtered.length} figura{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Alerts de feedback (loading, error, success) */}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status" aria-label="Cargando"></div>
        </div>
      )}
      {error && figuras.length === 0 && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}

      {/* Vista Tabla: cumple rúbrica y es útil para comparar */}
      {view === "table" && (
        <div className="card bg-secondary text-light shadow-sm">
          <table className="table table-dark table-striped mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Anime</th>
                <th>Personaje</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="text-center">No hay figuras</td>
                </tr>
              ) : (
                paginated.map((f) => (
                  <tr key={f._id}>
                    <td>{f.nombre}</td>
                    <td>{f.anime}</td>
                    <td>{f.personaje}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        ${f.precio}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {f.stock}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/figuras/${f._id}`)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/figuras/editar/${f._id}`)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(f._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Vista Cards: más visual y moderna */}
      {view === "cards" && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {paginated.length === 0 && !loading ? (
            <div className="col">
              <div className="alert alert-info text-center mb-0">
                No hay figuras
              </div>
            </div>
          ) : (
            paginated.map((f) => (
              <div className="col" key={f._id}>
                {/* Card principal con Bootstrap y efecto visual moderno */}
                <div
                  className="card bg-dark text-light shadow-lg border-0 card-hover h-100"
                  style={{
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "scale(1.04)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Imagen de la figura, recortada y proporcional */}
                  <img
                    src={f.imagen ? f.imagen : "/placeholder.png"}
                    alt={f.nombre}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    onError={e => { e.target.onerror = null; e.target.src = "/placeholder.png"; }}
                  />
                  {/* Contenido de la card */}
                  <div className="card-body d-flex flex-column gap-2">
                    {/* Nombre y anime */}
                    <h5 className="card-title mb-1">{f.nombre}</h5>
                    <span className="badge bg-info text-dark mb-2 align-self-start">{f.anime}</span>
                    {/* Personaje */}
                    <p className="card-text mb-2 text-secondary">{f.personaje}</p>
                    {/* Precio y stock */}
                    <div className="d-flex gap-2 mb-2">
                      <span className="badge bg-success fs-6">${f.precio}</span>
                      <span className="badge bg-warning text-dark fs-6">Stock: {f.stock}</span>
                    </div>
                    {/* Botones de acción alineados con flexbox y Bootstrap */}
                    <div className="d-flex justify-content-between gap-2 mt-auto">
                      <button className="btn btn-outline-info btn-sm w-100" onClick={() => navigate(`/figuras/${f._id}`)}>
                        <i className="bi bi-eye me-1"></i> Ver
                      </button>
                      <button className="btn btn-outline-warning btn-sm w-100" onClick={() => navigate(`/figuras/editar/${f._id}`)}>
                        <i className="bi bi-pencil-square me-1"></i> Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm w-100" onClick={() => handleDelete(f._id)}>
                        <i className="bi bi-trash me-1"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Paginación Bootstrap */}
      {totalPages > 1 && (
        <nav className="mt-4 d-flex justify-content-center">
          <ul className="pagination pagination-dark mb-0">
            <li className={`page-item${page === 1 ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(page - 1)}>
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item${page === i + 1 ? " active" : ""}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item${page === totalPages ? " disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(page + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
