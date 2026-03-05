// Servicio mínimo para CRUD de figuras usando fetch
// API base: import.meta.env.VITE_API_URL

const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/figuras`;

export async function getFiguras() {
  const res = await fetch(`${BASE}/get/all`);
  if (!res.ok) throw new Error('Error al cargar figuras');
  return res.json();
}

export async function getFigura(id) {
  const res = await fetch(`${BASE}/get/${id}`);
  if (!res.ok) throw new Error('Error al cargar figura');
  return res.json();
}

export async function createFigura(data) {
  const res = await fetch(`${BASE}/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear figura');
  return res.json();
}

export async function updateFigura(id, data) {
  const res = await fetch(`${BASE}/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar figura');
  return res.json();
}

export async function deleteFigura(id) {
  const res = await fetch(`${BASE}/delete/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar figura');
  return res.json();
}
