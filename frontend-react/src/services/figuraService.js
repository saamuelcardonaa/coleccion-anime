// src/services/figuraService.js
// Servicio que centraliza todas las llamadas HTTP al backend usando axios
// Este servicio actúa como intermediario entre los componentes y la API REST

import axios from 'axios';

// URL base del backend - cambiar si el servidor está en otro puerto o dirección
const API_URL = 'http://localhost:5000/figuras';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

/**
 * Obtener todas las figuras del servidor
 * Realiza: GET /figuras
 * Devuelve: respuesta con array de figuras
 */
export const obtenerFiguras = async () => {
  try {
    const response = await api.get('/');
    return response.data.data || []; // El backend devuelve { data: [...], success: true }
  } catch (error) {
    console.error('Error obteniendo figuras:', error);
    throw error;
  }
};

/**
 * Obtener una figura específica por su ID
 * Realiza: GET /figuras/:id
 * 
 * @param {string} id - El ID de MongoDB de la figura
 * @returns {object} La figura solicitada
 */
export const obtenerFiguraPorId = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error obteniendo figura ${id}:`, error);
    throw error;
  }
};

/**
 * Crear una nueva figura en el servidor
 * Realiza: POST /figuras
 * 
 * @param {object} figura - Objeto con datos: { nombre, anime, personaje, precio, stock, imagen }
 * @returns {object} La figura creada con su ID asignado por MongoDB
 */
export const crearFigura = async (figura) => {
  try {
    const response = await api.post('/', figura);
    return response.data.data;
  } catch (error) {
    console.error('Error creando figura:', error);
    throw error;
  }
};

/**
 * Actualizar una figura existente
 * Realiza: PUT /figuras/:id
 * 
 * @param {string} id - El ID de la figura a actualizar
 * @param {object} figura - Objeto con los datos actualizados
 * @returns {object} La figura actualizada
 */
export const actualizarFigura = async (id, figura) => {
  try {
    const response = await api.put(`/${id}`, figura);
    return response.data.data;
  } catch (error) {
    console.error(`Error actualizando figura ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar una figura del servidor
 * Realiza: DELETE /figuras/:id
 * 
 * @param {string} id - El ID de la figura a eliminar
 * @returns {object} Confirmación de eliminación
 */
export const eliminarFigura = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando figura ${id}:`, error);
    throw error;
  }
};
