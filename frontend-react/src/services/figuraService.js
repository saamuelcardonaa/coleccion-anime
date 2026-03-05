// src/services/figuraService.js
// Servicio que centraliza todas las llamadas HTTP al backend usando axios
// Este servicio actúa como intermediario entre los componentes y la API REST


import axios from 'axios';

// URL base del backend desde Vite env o valor por defecto (sin /figuras)
const API_URL = import.meta.env.VITE_API_URL || "https://coleccion-anime.vercel.app/api/v1";
const FIGURAS_URL = `${API_URL}/figuras`;

// Crear instancia de axios con configuración base
const api = axios.create({
  timeout: 5000
});


// Obtener todas las figuras
export const getAllFiguras = async () => {
  try {
    const res = await api.get(`${FIGURAS_URL}/get/all`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};


// Obtener figura por ID
export const getFiguraById = async (id) => {
  try {
    const res = await api.get(`${FIGURAS_URL}/get/${id}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};


// Crear figura
export const createFigura = async (payload) => {
  try {
    const res = await api.post(`${FIGURAS_URL}/post`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};


// Actualizar figura
export const updateFigura = async (id, payload) => {
  try {
    const res = await api.patch(`${FIGURAS_URL}/update/${id}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};


// Eliminar figura
export const deleteFigura = async (id) => {
  try {
    const res = await api.delete(`${FIGURAS_URL}/delete/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
