// src/components/FiguraEdit.jsx
// Componente envoltorio para editar figuras
// Carga la figura del backend mediante su ID y la pasa a FiguraForm

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFiguraById } from '../services/figuraService';
import FiguraForm from './FiguraForm';

export default function FiguraEdit() {
  // Hook para obtener el ID de la URL
  const { id } = useParams();

  // Estado para almacenar la figura cargada
  const [figura, setFigura] = useState(null);

  // Estado para controlar carga
  const [cargando, setCargando] = useState(true);

  // Estado para errores
  const [error, setError] = useState(null);

  /**
   * useEffect - Se ejecuta al montar el componente
   * Obtiene la figura del backend usando el ID
   */
  useEffect(() => {
    const cargarFigura = async () => {
      try {
        setCargando(true);
        const data = await getFiguraById(id);
        setFigura(data);
      } catch (err) {
        setError('No se pudo cargar la figura: ' + err.message);
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      cargarFigura();
    }
  }, [id]);

  // Mostrar spinner mientras carga
  if (cargando) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando figura...</p>
      </div>
    );
  }

  // Mostrar error si no se pudo cargar
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>⚠️ Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    );
  }

  // Pasar la figura a FiguraForm con los datos cargados
  return <FiguraForm />;
}
