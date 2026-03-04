// src/components/FiguraList.jsx
// Componente para listar todas las figuras de anime
// Obtiene datos del backend y permite crear, editar y eliminar figuras

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerFiguras, eliminarFigura } from '../services/figuraService';
import './FiguraList.css';

export default function FiguraList() {
  // Estado para almacenar la lista de figuras obtenidas del backend
  const [figuras, setFiguras] = useState([]);
  
  // Estado para controlar si se están cargando datos
  const [cargando, setCargando] = useState(true);
  
  // Estado para mostrar mensajes de error
  const [error, setError] = useState(null);
  
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  /**
   * useEffect - Hook que se ejecuta al montar el componente
   * Carga la lista de figuras del servidor backend
   */
  useEffect(() => {
    cargarFiguras();
  }, []);

  /**
   * cargarFiguras()
   * Función asincrónica que obtiene todas las figuras del backend
   * Maneja errores y actualiza el estado de carga
   */
  const cargarFiguras = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await obtenerFiguras();
      setFiguras(datos);
    } catch (err) {
      // Si falla, muestra un mensaje de error útil
      setError('❌ No se pudo cargar las figuras. Verifica que el backend esté corriendo en puerto 5000');
      console.error('Error cargando figuras:', err);
    } finally {
      setCargando(false);
    }
  };

  /**
   * handleEliminar()
   * Solicita confirmación del usuario y elimina una figura
   * Luego recarga la lista de figuras
   * 
   * @param {string} id - ID de la figura a eliminar
   * @param {string} nombre - Nombre de la figura (para mostrar en confirmación)
   */
  const handleEliminar = async (id, nombre) => {
    // Mostrar confirmación antes de eliminar
    if (!window.confirm(`¿Estás seguro de que deseas eliminar "${nombre}"?`)) {
      return;
    }

    try {
      await eliminarFigura(id);
      alert('✅ Figura eliminada exitosamente');
      // Recargar la lista para reflejar cambios
      cargarFiguras();
    } catch (err) {
      alert('❌ Error al eliminar la figura: ' + err.message);
    }
  };

  return (
    <div className="list-container">
      <div className="container">
        
        {/* Encabezado con título y botón de crear */}
        <div className="list-header">
          <h1>📚 Colección de Figuras</h1>
          <button 
            className="btn-crear"
            onClick={() => navigate('/crear')}
            title="Crear nueva figura"
          >
            ➕ Nueva Figura
          </button>
        </div>

        {/* Mostrar alerta de error si existe */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Mostrar spinner (loading) mientras se cargan datos */}
        {cargando && (
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando figuras...</p>
          </div>
        )}

        {/* Mostrar tabla de figuras si hay datos y no está cargando */}
        {!cargando && figuras.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Anime</th>
                  <th>Personaje</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Recorrer cada figura y mostrar una fila en la tabla */}
                {figuras.map((figura) => (
                  <tr key={figura._id}>
                    {/* Columna: Imagen */}
                    <td>
                      {figura.imagen ? (
                        <img 
                          src={figura.imagen} 
                          alt={figura.nombre}
                          className="tabla-imagen"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      ) : (
                        <div className="sin-imagen">🖼️</div>
                      )}
                    </td>

                    {/* Columna: Nombre */}
                    <td>
                      <strong>{figura.nombre}</strong>
                    </td>

                    {/* Columna: Anime */}
                    <td>{figura.anime || '-'}</td>

                    {/* Columna: Personaje */}
                    <td>{figura.personaje || '-'}</td>

                    {/* Columna: Precio */}
                    <td>
                      <span className="precio-fuerte">
                        ${(figura.precio || 0).toFixed(2)}
                      </span>
                    </td>

                    {/* Columna: Stock con badge */}
                    <td>
                      <span className={`badge-stock ${figura.stock > 0 ? 'badge-disponible' : 'badge-agotado'}`}>
                        {figura.stock || 0} {figura.stock === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </td>

                    {/* Columna: Botones de acción (Editar, Eliminar) */}
                    <td>
                      <div className="celda-acciones">
                        {/* Botón Editar - navega a /editar/:id */}
                        <button
                          className="btn-tabla btn-editar"
                          onClick={() => navigate(`/editar/${figura._id}`, { state: { figura } })}
                          title={`Editar ${figura.nombre}`}
                        >
                          ✏️ Editar
                        </button>

                        {/* Botón Eliminar - solicita confirmación */}
                        <button
                          className="btn-tabla btn-eliminar"
                          onClick={() => handleEliminar(figura._id, figura.nombre)}
                          title={`Eliminar ${figura.nombre}`}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mostrar mensaje cuando no hay figuras */}
        {!cargando && figuras.length === 0 && !error && (
          <div className="empty-state">
            <h3>📭 La colección está vacía</h3>
            <p>No hay figuras registradas aún.</p>
            <button 
              className="btn-crear"
              onClick={() => navigate('/crear')}
            >
              ➕ Crear primera figura
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
