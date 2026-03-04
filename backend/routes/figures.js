// Rutas para /api/figures
const express = require('express');
const router = express.Router();
const controller = require('../controllers/figuresController');

// Listar figuras
router.get('/', controller.listFigures);

// Crear figura
router.post('/', controller.createFigure);

// Ejemplo: obtener datos de Jikan API por MAL id
router.get('/jikan/:malId', controller.fetchFromJikan);

module.exports = router;
