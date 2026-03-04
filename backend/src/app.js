// app.js
// Configura y exporta la aplicación Express sin arrancarla.
// Esto facilita pruebas y separación de responsabilidades (arranque en server.js).
const express = require('express');
const figuresRouter = require('./routes/figures');

const app = express();
app.use(express.json());

// Montar rutas de la API bajo /api/figures
app.use('/api/figures', figuresRouter);

module.exports = app;
