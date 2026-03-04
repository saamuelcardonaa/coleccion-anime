// src/controllers/figurasController.js
// Controlador centralizado para todas las operaciones relacionadas con figuras.
// La versión "plural" se ajusta a la convención REST y está comentada
// detalladamente para que un profesor entienda cada paso.

import Figura from '../models/Figura.js';
import axios from 'axios';

/**
 * obtenerFiguras
 * GET /get/all
 * Devuelve todas las figuras ordenadas por fecha de creación descendente.
 */
export const obtenerFiguras = async (req, res) => {
  try {
    const figuras = await Figura.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: figuras.length, data: figuras });
  } catch (err) {
    console.error('Error en obtenerFiguras:', err);
    return res.status(500).json({ success: false, error: 'Error al obtener las figuras' });
  }
};

/**
 * obtenerFiguraPorId
 * GET /get/:id
 * Busca una figura por su _id de MongoDB.
 */
export const obtenerFiguraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const figura = await Figura.findById(id);
    if (!figura) {
      return res.status(404).json({ success: false, error: 'Figura no encontrada' });
    }
    return res.status(200).json({ success: true, data: figura });
  } catch (err) {
    console.error('Error en obtenerFiguraPorId:', err);
    return res.status(500).json({ success: false, error: 'Error al obtener la figura' });
  }
};

/**
 * crearFigura
 * POST /post
 * Crea un nuevo documento con los datos enviados en el body.
 */
export const crearFigura = async (req, res) => {
  try {
    const nueva = new Figura(req.body);
    const guardada = await nueva.save();
    return res.status(201).json({ success: true, message: 'Figura creada exitosamente', data: guardada });
  } catch (err) {
    console.error('Error en crearFigura:', err);
    return res.status(400).json({ success: false, error: 'Error al crear la figura', message: err.message });
  }
};

/**
 * actualizarFigura
 * PATCH /update/:id
 * Actualiza los campos proporcionados en el body.
 */
export const actualizarFigura = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await Figura.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!actualizado) {
      return res.status(404).json({ success: false, error: 'Figura no encontrada' });
    }
    return res.status(200).json({ success: true, message: 'Figura actualizada exitosamente', data: actualizado });
  } catch (err) {
    console.error('Error en actualizarFigura:', err);
    return res.status(400).json({ success: false, error: 'Error al actualizar la figura', message: err.message });
  }
};

/**
 * eliminarFigura
 * DELETE /delete/:id
 * Borra el documento indicado por el id.
 */
export const eliminarFigura = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Figura.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ success: false, error: 'Figura no encontrada' });
    }
    return res.status(200).json({ success: true, message: 'Figura eliminada exitosamente', data: eliminado });
  } catch (err) {
    console.error('Error en eliminarFigura:', err);
    return res.status(500).json({ success: false, error: 'Error al eliminar la figura' });
  }
};

/**
 * obtenerAnimeJikanPorMalId
 * GET /jikan/:malId
 * Consulta la API pública de Jikan para obtener datos de un anime.
 * Respondemos sólo con los campos que nos interesan para simplificar la respuesta.
 */
export const obtenerAnimeJikanPorMalId = async (req, res) => {
  try {
    const { malId } = req.params;
    const url = `https://api.jikan.moe/v4/anime/${malId}`;
    const { data } = await axios.get(url);
    const anime = data.data; // Jikan envía el objeto dentro de data.data

    // Simplificamos el JSON para el profesor
    const resultado = {
      title: anime.title,
      synopsis: anime.synopsis,
      imageUrl: anime.images?.jpg?.image_url || anime.image_url,
      score: anime.score,
      episodes: anime.episodes,
    };

    return res.status(200).json({ success: true, data: resultado });
  } catch (err) {
    console.error('Error en obtenerAnimeJikanPorMalId:', err);
    return res.status(500).json({ success: false, error: 'Error consultando Jikan API' });
  }
};
