// Servicio centralizado para consumir la API REST de figuras
// Permite reutilizar la lógica de peticiones y manejo de errores en toda la app

// Base URL configurable mediante variable de entorno (útil para desarrollo y producción)
const API = import.meta.env.VITE_API_URL || "https://coleccion-anime.vercel.app/api/v1";
// BASE apunta al recurso /figuras
const BASE = `${API}/figuras`;

// Obtiene todas las figuras de la colección
export async function getAll() {
  try {
    // Endpoint correcto: /figuras/get/all
    const res = await fetch(`${BASE}/get/all`);
    // La API responde con { success, data }
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Error en la API");
    return json.data;
  } catch (err) {
    // Manejo de errores centralizado
    throw err;
  }
}

// Obtiene una figura por su ID
export async function getById(id) {
  try {
    // Endpoint correcto: /figuras/get/:id
    const res = await fetch(`${BASE}/get/${id}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Error en la API");
    return json.data;
  } catch (err) {
    throw err;
  }
}

// Crea una nueva figura (POST)
export async function create(figura) {
  try {
    // Endpoint correcto: /figuras/post
    const res = await fetch(`${BASE}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(figura),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Error en la API");
    return json.data;
  } catch (err) {
    throw err;
  }
}

// Actualiza una figura existente (PATCH)
export async function update(id, figura) {
  try {
    // Endpoint correcto: /figuras/update/:id (PATCH)
    const res = await fetch(`${BASE}/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(figura),
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Error en la API");
    return json.data;
  } catch (err) {
    throw err;
  }
}

// Elimina una figura por su ID (DELETE)
export async function remove(id) {
  try {
    // Endpoint correcto: /figuras/delete/:id
    const res = await fetch(`${BASE}/delete/${id}`, {
      method: "DELETE"
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Error en la API");
    return json.data;
  } catch (err) {
    throw err;
  }
}
