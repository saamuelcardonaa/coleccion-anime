// Formulario para crear o editar una figura
// Incluye validaciones, feedback visual y diseño profesional con Bootstrap

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, update, getById } from "../services/figurasApi";

const initialForm = {
  nombre: "",
  anime: "",
  personaje: "",
  precio: "",
  stock: "",
  imagen: "",
  malId: "",
};

function FiguraForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Si hay id, carga los datos para edición
  useEffect(() => {
    if (id) {
      setLoading(true);
      getById(id)
        .then((data) => {
          setForm({
            nombre: data.nombre || "",
            anime: data.anime || "",
            personaje: data.personaje || "",
            precio: data.precio != null ? String(data.precio) : "",
            stock: data.stock != null ? String(data.stock) : "",
            imagen: data.imagen || "",
            malId: data.malId != null ? String(data.malId) : "",
          });
          setLoading(false);
        })
        .catch(() => {
          setError("No se pudo cargar la figura.");
          setLoading(false);
        });
    }
  }, [id]);

  // Validaciones de campos antes de enviar
  const validate = () => {
    const errors = {};
    if (!form.nombre.trim()) errors.nombre = "El nombre es requerido.";
    if (!form.anime.trim()) errors.anime = "El anime es requerido.";
    if (form.precio === "" || isNaN(form.precio) || Number(form.precio) < 0)
      errors.precio = "El precio debe ser un número mayor o igual a 0.";
    if (form.stock === "" || isNaN(form.stock) || Number(form.stock) < 0)
      errors.stock = "El stock debe ser un número mayor o igual a 0.";
    if (form.malId && (isNaN(form.malId) || !Number.isInteger(Number(form.malId))))
      errors.malId = "malId debe ser un número entero.";
    return errors;
  };

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // Envío del formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
      };
      if (!payload.malId) {
        delete payload.malId;
      } else {
        payload.malId = Number(payload.malId);
      }
      if (id) {
        await update(id, payload);
        setSuccessMsg("Figura actualizada correctamente.");
      } else {
        await create(payload);
        setSuccessMsg("Figura creada correctamente.");
      }
      setTimeout(() => navigate("/figuras"), 1200);
    } catch (err) {
      setError("Ocurrió un error al guardar la figura.");
    } finally {
      setSaving(false);
    }
  };

  // Feedback de carga
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status" aria-label="Cargando"></div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        {/* Card principal del formulario */}
        <div className="card bg-secondary text-light shadow">
          {/* Header dinámico según modo (crear/editar) */}
          <div className="card-header text-center">
            <h3 className="mb-0">
              <i className={`bi ${id ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
              {id ? "Editar Figura" : "Nueva Figura"}
            </h3>
          </div>
          <div className="card-body">
            {/* Mensajes de error y éxito */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="alert alert-success" role="alert">
                {successMsg}
              </div>
            )}
            {/* Formulario controlado con validaciones visuales */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  className={`form-control${fieldErrors.nombre ? " is-invalid" : ""}`}
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={saving}
                />
                {fieldErrors.nombre && (
                  <div className="invalid-feedback">{fieldErrors.nombre}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Anime *</label>
                <input
                  type="text"
                  className={`form-control${fieldErrors.anime ? " is-invalid" : ""}`}
                  name="anime"
                  value={form.anime}
                  onChange={handleChange}
                  disabled={saving}
                />
                {fieldErrors.anime && (
                  <div className="invalid-feedback">{fieldErrors.anime}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Personaje</label>
                <input
                  type="text"
                  className="form-control"
                  name="personaje"
                  value={form.personaje}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio *</label>
                <input
                  type="number"
                  className={`form-control${fieldErrors.precio ? " is-invalid" : ""}`}
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  min="0"
                  disabled={saving}
                />
                {fieldErrors.precio && (
                  <div className="invalid-feedback">{fieldErrors.precio}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Stock *</label>
                <input
                  type="number"
                  className={`form-control${fieldErrors.stock ? " is-invalid" : ""}`}
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  disabled={saving}
                />
                {fieldErrors.stock && (
                  <div className="invalid-feedback">{fieldErrors.stock}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Imagen (URL)</label>
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  disabled={saving}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">malId</label>
                <input
                  type="text"
                  className={`form-control${fieldErrors.malId ? " is-invalid" : ""}`}
                  name="malId"
                  value={form.malId}
                  onChange={handleChange}
                  disabled={saving}
                />
                {fieldErrors.malId && (
                  <div className="invalid-feedback">{fieldErrors.malId}</div>
                )}
              </div>
              {/* Botones alineados a la derecha con iconos */}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <i className="bi bi-save me-1"></i>
                  {saving ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/figuras")}
                  disabled={saving}
                >
                  <i className="bi bi-arrow-left me-1"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiguraForm;
