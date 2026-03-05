import React, { useEffect, useState } from 'react';
import { getFiguras, deleteFigura } from '../services/figurasApi';
import { Link } from 'react-router-dom';

export default function FigurasList() {
  const [figuras, setFiguras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setLoading(true);
    getFiguras()
      .then(data => setFiguras(data.data || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [success]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar figura?')) return;
    try {
      await deleteFigura(id);
      setSuccess('Figura eliminada');
      setTimeout(() => setSuccess(''), 1500);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Figuras</h2>
      <Link to="/nueva" className="btn btn-primary mb-3">Nueva Figura</Link>
      {loading && <div className="alert alert-info">Cargando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th><th>Anime</th><th>Personaje</th><th>Precio</th><th>Stock</th><th></th>
          </tr>
        </thead>
        <tbody>
          {figuras.map(f => (
            <tr key={f._id}>
              <td><Link to={`/${f._id}`}>{f.nombre}</Link></td>
              <td>{f.anime}</td>
              <td>{f.personaje}</td>
              <td>{f.precio}</td>
              <td>{f.stock}</td>
              <td>
                <Link to={`/${f._id}/editar`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(f._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
