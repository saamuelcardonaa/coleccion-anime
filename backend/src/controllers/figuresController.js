// src/controllers/figuresController.js
// Controlador con la lógica para gestionar figuras de anime.
// Aquí van las funciones que responden a las rutas (separación de responsabilidades).
const Figure = require('../models/Figure');
const axios = require('axios');

// GET /api/figures - listar todas las figuras guardadas
exports.listFigures = async (req, res) => {
  try {
    const figures = await Figure.find().sort({ createdAt: -1 });
    res.json(figures);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo figuras' });
  }
};

// POST /api/figures - crear una figura
exports.createFigure = async (req, res) => {
  try {
    const figure = new Figure(req.body);
    await figure.save();
    res.status(201).json(figure);
  } catch (err) {
    res.status(400).json({ error: 'Error creando figura' });
  }
};

// GET /api/figures/jikan/:malId - ejemplo de integracion con Jikan API
// Recupera información pública de Jikan (MyAnimeList) para usar como referencia
exports.fetchFromJikan = async (req, res) => {
  const { malId } = req.params; // id de anime en MyAnimeList
  try {
    const url = `https://api.jikan.moe/v4/anime/${malId}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error consultando Jikan API' });
  }
};
