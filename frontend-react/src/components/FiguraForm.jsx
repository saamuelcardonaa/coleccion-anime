// src/components/FiguraForm.jsx
// Componente formulario para crear o editar figuras de anime
// Puede funcionar en modo creación (sin figura) o edición (con figura existente)

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createFigura, updateFigura } from '../services/figuraService';
import './FiguraForm.css';

export default function FiguraForm() {
  // Hook para obtener el ID de la URL (usado solo en edición)
  const { id } = useParams();
  
  // Hook para navegar entre páginas
  const navigate = useNavigate();
  
  // Hook para obtener datos pasados en navegación (figura editada)
  const location = useLocation();
  const figuraEditada = location.state?.figura;

  // Estado del formulario - almacena los valores de cada input
  const [formData, setFormData] = useState({
    nombre: '',
    anime: '',
    personaje: '',
    precio: 0,
    stock: 0,
    imagen: ''
  });

  // Estado para mostrar loading mientras se guarda
  const [guardando, setGuardando] = useState(false);

  // Estado para mostrar errores
  const [errores, setErrores] = useState({});

  /**
   * useEffect - Se ejecuta al montar el componente
   * Si viene en modo edición, carga los datos de la figura
   */
  useEffect(() => {
    if (figuraEditada && id) {
      // Modo edición: llenar el formulario con datos existentes
      setFormData({
        nombre: figuraEditada.nombre || '',
        anime: figuraEditada.anime || '',
        personaje: figuraEditada.personaje || '',
        precio: figuraEditada.precio || 0,
        stock: figuraEditada.stock || 0,
        imagen: figuraEditada.imagen || ''
      });
    }
  }, [id, figuraEditada]);

  /**
   * handleChange()
   * Se ejecuta cuando cambia el valor de un input
   * Actualiza el estado formData
   * 
   * @param {event} e - Evento del input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convertir a número si el campo es precio o stock
    let finalValue = value;
    if (name === 'precio' || name === 'stock') {
      finalValue = parseFloat(value) || 0;
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Limpiar error de este campo cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * validarFormulario()
   * Valida que los campos requeridos estén completos
   * 
   * @returns {boolean} true si el formulario es válido
   */
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.anime.trim()) {
      nuevosErrores.anime = 'El anime es requerido';
    } else if (formData.anime.trim().length < 3) {
      nuevosErrores.anime = 'El anime debe tener al menos 3 caracteres';
    }

    if (formData.precio < 0) {
      nuevosErrores.precio = 'El precio no puede ser negativo';
    }

    if (formData.stock < 0) {
      nuevosErrores.stock = 'El stock no puede ser negativo';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /**
   * handleSubmit()
   * Se ejecuta al enviar el formulario
   * Valida, guarda en el backend y navega al listado
   * 
   * @param {event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      alert('Por favor completa todos los campos requeridos correctamente');
      return;
    }

    setGuardando(true);

    try {
      if (id) {
        // Modo edición: usar PUT
        await updateFigura(id, formData);
        alert('Figura actualizada exitosamente');
      } else {
        // Modo creación: usar POST
        await createFigura(formData);
        alert('Figura creada exitosamente');
      }

      // Navegar al listado
      navigate('/');
    } catch (err) {
      alert('Error al guardar la figura: ' + err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container form-container">
      <div className="form-header">
        <h1>{id ? '✏️ Editar Figura' : '➕ Nueva Figura'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="figura-form">
        
        {/* Fila 1: Nombre y Anime */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Saitama Statue"
              className={errores.nombre ? 'input-error' : ''}
            />
            {errores.nombre && <span className="error-message">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="anime">Anime *</label>
            <input
              type="text"
              id="anime"
              name="anime"
              value={formData.anime}
              onChange={handleChange}
              placeholder="Ej: One Punch Man"
              className={errores.anime ? 'input-error' : ''}
            />
            {errores.anime && <span className="error-message">{errores.anime}</span>}
          </div>
        </div>

        {/* Fila 2: Personaje */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="personaje">Personaje</label>
            <input
              type="text"
              id="personaje"
              name="personaje"
              value={formData.personaje}
              onChange={handleChange}
              placeholder="Ej: Saitama (opcional)"
            />
          </div>
        </div>

        {/* Fila 3: Precio y Stock */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precio">Precio ($)</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={errores.precio ? 'input-error' : ''}
            />
            {errores.precio && <span className="error-message">{errores.precio}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock (Cantidad)</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errores.stock ? 'input-error' : ''}
            />
            {errores.stock && <span className="error-message">{errores.stock}</span>}
          </div>
        </div>

        {/* Fila 4: Imagen */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="imagen">URL de Imagen</label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg (opcional)"
            />
          </div>
        </div>

        {/* Vista previa de imagen si existe */}
        {formData.imagen && (
          <div className="form-row">
            <div className="imagen-preview">
              <p>Vista previa:</p>
              <img src={formData.imagen} alt="Vista previa" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : (id ? '💾 Actualizar' : '💾 Crear')}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/')}
            disabled={guardando}
          >
            ❌ Cancelar
          </button>
        </div>

        {/* Nota sobre campos requeridos */}
        <small className="required-note">* Campo requerido</small>
      </form>
    </div>
  );
}
