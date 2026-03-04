// app.js
// Configura y exporta la aplicación Express sin arrancarla.
// Esto facilita pruebas y separación de responsabilidades (arranque en server.js).
const express = require('express');
const figuresRouter = require('./routes/figures');
const figuraRoutes = require('./routes/figuraRoutes');

const app = express();
app.use(express.json());

// Montar rutas de la API
// Ruta antigua (compatible): /api/figures
app.use('/api/figures', figuresRouter);

// Ruta nueva con estructura mejorada: /figuras
// Aquí se montan todas las rutas CRUD para el modelo Figura
app.use('/figuras', figuraRoutes);

module.exports = app;
