import React, { useEffect, useState } from 'react';
import { createFigura, getFigura, updateFigura } from '../services/figurasApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function FiguraForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre:'', anime:'', personaje:'', precio:'', stock:'', imagen:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getFigura(id)
        .then(data => setForm(data.data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim() || !form.anime.trim() || !form.precio || !form.stock) return false;
    if (form.nombre.length < 3 || form.anime.length < 3) return false;
    if (Number(form.precio) < 0 || Number(form.stock) < 0) return false;
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return setError('Completa todos los campos obligatorios correctamente');
    setLoading(true);
    setError('');
    try {
      if (id) {
        await updateFigura(id, form);
        setSuccess('Figura actualizada');
      } else {
        await createFigura(form);
        setSuccess('Figura creada');
        setForm({ nombre:'', anime:'', personaje:'', precio:'', stock:'', imagen:'' });
      }
      setTimeout(() => { setSuccess(''); navigate('/'); }, 1200);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nueva'} Figura</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre*</label>
          <input className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required minLength={3} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Anime*</label>
          <input className="form-control" name="anime" value={form.anime} onChange={handleChange} required minLength={3} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Personaje</label>
          <input className="form-control" name="personaje" value={form.personaje} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Precio*</label>
          <input className="form-control" name="precio" type="number" value={form.precio} onChange={handleChange} required min={0} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Stock*</label>
          <input className="form-control" name="stock" type="number" value={form.stock} onChange={handleChange} required min={0} />
        </div>
        <div className="col-12">
          <label className="form-label">Imagen (URL)</label>
          <input className="form-control" name="imagen" value={form.imagen} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Guardando...' : (id ? 'Actualizar' : 'Crear')}</button>
          <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
