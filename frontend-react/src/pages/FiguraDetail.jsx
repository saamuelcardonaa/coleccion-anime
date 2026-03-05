import React, { useEffect, useState } from 'react';
import { getFigura } from '../services/figurasApi';
import { useParams, Link } from 'react-router-dom';

export default function FiguraDetail() {
  const { id } = useParams();
  const [figura, setFigura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getFigura(id)
      .then(data => setFigura(data.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="alert alert-info">Cargando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!figura) return <div>No encontrada</div>;

  return (
    <div className="container mt-4">
      <h2>{figura.nombre}</h2>
      <p><b>Anime:</b> {figura.anime}</p>
      <p><b>Personaje:</b> {figura.personaje}</p>
      <p><b>Precio:</b> {figura.precio}</p>
      <p><b>Stock:</b> {figura.stock}</p>
      {figura.imagen && <img src={figura.imagen} alt={figura.nombre} style={{maxWidth:300}} />}
      <div className="mt-3">
        <Link to={`/${figura._id}/editar`} className="btn btn-warning me-2">Editar</Link>
        <Link to="/" className="btn btn-secondary">Volver</Link>
      </div>
    </div>
  );
}
