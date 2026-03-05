const API = import.meta.env.VITE_API_URL || "https://coleccion-anime.vercel.app/api/v1";
const BASE = `${API}/figuras`;

async function handleResponse(res, defaultMsg) {
  if (!res.ok) {
    let msg = `${defaultMsg} (status ${res.status})`;
    try {
      const json = await res.json();
      if (json && json.message) msg = json.message;
    } catch {}
    throw new Error(msg);
  }
  const json = await res.json();
  if (json.success === false) throw new Error(json.message || defaultMsg);
  return json.data;
}

export async function getAll() {
  const res = await fetch(`${BASE}/get/all`);
  return handleResponse(res, 'Error al cargar figuras');
}

export async function getById(id) {
  const res = await fetch(`${BASE}/get/${id}`);
  return handleResponse(res, 'Error al cargar figura');
}

export async function create(payload) {
  const res = await fetch(`${BASE}/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Error al crear figura');
}

export async function update(id, payload) {
  const res = await fetch(`${BASE}/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return handleResponse(res, 'Error al actualizar figura');
}

export async function remove(id) {
  const res = await fetch(`${BASE}/delete/${id}`, { method: 'DELETE' });
  return handleResponse(res, 'Error al eliminar figura');
}
