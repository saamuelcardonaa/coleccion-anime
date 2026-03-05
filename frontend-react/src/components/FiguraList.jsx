// src/components/FiguraList.jsx
// Componente para listar todas las figuras de anime
// Obtiene datos del backend y permite crear, editar y eliminar figuras

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFiguras, deleteFigura } from '../services/figuraService';
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
    const cargarFiguras = async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = await getAllFiguras();
        setFiguras(datos);
      } catch (err) {
        setError('❌ No se pudo cargar las figuras.');
        console.error('Error cargando figuras:', err);
      } finally {
        setCargando(false);
      }
    };
    cargarFiguras();
  }, []);

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
      await deleteFigura(id);
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
