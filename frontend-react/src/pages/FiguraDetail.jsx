// Página de detalle de una figura
// Muestra información completa, imagen, badges y acciones (editar/eliminar)

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById, remove } from "../services/figurasApi";

function FiguraDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [figura, setFigura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Carga de datos al montar el componente
  useEffect(() => {
    setLoading(true);
    setError("");
    getById(id)
      .then((data) => {
        setFigura(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la figura.");
        setLoading(false);
      });
  }, [id]);

  // Eliminar figura con confirmación
  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta figura?")) return;
    try {
      await remove(id);
      setSuccessMsg("Figura eliminada correctamente.");
      setTimeout(() => navigate("/figuras"), 1200);
    } catch {
      setError("No se pudo eliminar la figura.");
    }
  };

  // Feedback de carga y errores
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status" aria-label="Cargando"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        {error}
      </div>
    );
  }

  if (!figura) {
    return null;
  }

  return (
    <div className="container mt-4">
      {/* Mensaje de éxito tras eliminar */}
      {successMsg && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}
      {/* Layout en dos columnas: imagen y datos */}
      <div className="row g-4 justify-content-center align-items-start">
        {/* Columna izquierda: imagen en card */}
        {figura.imagen && (
          <div className="col-12 col-md-5">
            <div className="card bg-dark text-light shadow-sm h-100">
              <img
                src={figura.imagen}
                className="card-img-top"
                alt={figura.nombre}
                style={{ objectFit: "cover", height: "350px" }}
              />
            </div>
          </div>
        )}
        {/* Columna derecha: datos y acciones */}
        <div className={figura.imagen ? "col-12 col-md-7" : "col-12 col-md-8"}>
          <div className="card bg-dark text-light shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">{figura.nombre}</h3>
              <h5 className="card-subtitle mb-2 text-info">{figura.anime}</h5>
              <p className="mb-2">
                <strong>Personaje:</strong> {figura.personaje}
              </p>
              {/* Badges para precio, stock y malId */}
              <div className="mb-3">
                <span className="badge bg-info text-dark me-2 fs-6">
                  ${figura.precio}
                </span>
                <span className="badge bg-warning text-dark fs-6">
                  Stock: {figura.stock}
                </span>
                {figura.malId && (
                  <span className="badge bg-secondary ms-2">
                    malId: {figura.malId}
                  </span>
                )}
              </div>
              {/* Botones de acción: volver, editar, eliminar */}
              <div className="d-flex gap-2 mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/figuras")}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  Volver
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/figuras/editar/${figura._id}`)}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash me-1"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiguraDetail;
