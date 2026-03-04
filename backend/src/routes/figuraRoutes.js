// src/routes/figuraRoutes.js
// Archivo de rutas que define los endpoints HTTP para gestionar figuras.
// Cada ruta conecta un método HTTP y un path con una función del controlador.
const express = require('express');
const router = express.Router();
const figuraController = require('../controllers/figuraController');

/**
 * GET /figuras
 * Obtiene la lista completa de todas las figuras de la colección.
 * Respuesta esperada: 
 * {
 *   success: true,
 *   count: 5,
 *   data: [{ _id, nombre, anime, precio, stock, ... }, ...]
 * }
 * 
 * El router.get() define una ruta GET y ejecuta figuraController.obtenerFiguras
 */
router.get('/', figuraController.obtenerFiguras);

/**
 * GET /figuras/jikan/buscar?nombre=Naruto
 * ENDPOINT PARA CONSUMIR API EXTERNA (Jikan - MyAnimeList).
 * 
 * Busca información de animes en la API pública de Jikan.
 * IMPORTANTE: Esta ruta debe ir ANTES de router.get('/:id') para que no
 * sea interpretada como un parámetro :id dinámico.
 * 
 * Query parameters:
 *   - nombre (obligatorio): nombre del anime a buscar
 * 
 * Ej: GET /figuras/jikan/buscar?nombre=Naruto
 * Ej: GET /figuras/jikan/buscar?nombre=One Punch Man
 * 
 * Respuesta esperada (200 - OK):
 * {
 *   success: true,
 *   count: 3,
 *   message: "Se encontraron 3 resultado(s) para \"Naruto\"",
 *   data: [
 *     {
 *       malId: 20,
 *       titulo: "Naruto",
 *       sinopsis: "Naruto Uzumaki es un ninja joven que aspira...",
 *       score: 7.5,
 *       episodios: 220,
 *       tipo: "TV",
 *       imagen: "https://...",
 *       ...
 *     }
 *   ]
 * }
 * 
 * Error si falta parámetro (400 - Bad Request):
 * {
 *   success: false,
 *   error: "Parámetro requerido faltante",
 *   message: "El parámetro \"nombre\" es obligatorio en la query string"
 * }
 */
router.get('/jikan/buscar', figuraController.buscarAnimeJikan);

/**
 * GET /figuras/:id
 * Obtiene una figura específica por su ID (MongoDB _id).
 * Parámetro :id es un placeholder que recibe el ID dinámicamente
 * Ej: GET /figuras/507f1f77bcf86cd799439011
 * Respuesta esperada:
 * {
 *   success: true,
 *   data: { _id, nombre, anime, precio, stock, ... }
 * }
 * 
 * Si el :id no existe, devuelve error 404
 */
router.get('/:id', figuraController.obtenerFiguraPorId);

/**
 * POST /figuras
 * Crea una nueva figura en la colección.
 * El body debe incluir los datos de la figura en formato JSON:
 * {
 *   nombre: "Saitama Statue",
 *   anime: "One Punch Man",
 *   personaje: "Saitama",
 *   precio: 49.99,
 *   stock: 5,
 *   imagen: "https://..."
 * }
 * Campos requeridos: nombre, anime
 * 
 * Respuesta esperada (201 - creado):
 * {
 *   success: true,
 *   message: "Figura creada exitosamente",
 *   data: { _id, nombre, anime, ... }
 * }
 */
router.post('/', figuraController.crearFigura);

/**
 * PUT /figuras/:id
 * Actualiza una figura existente.
 * Parámetro :id es el _id de la figura a actualizar
 * El body contiene solo los campos a actualizar (actualización parcial):
 * {
 *   precio: 39.99,
 *   stock: 3
 * }
 * 
 * Respuesta esperada (200 - OK):
 * {
 *   success: true,
 *   message: "Figura actualizada exitosamente",
 *   data: { _id, nombre, anime, precio: 39.99, stock: 3, ... }
 * }
 * 
 * Si el :id no existe, devuelve error 404
 */
router.put('/:id', figuraController.actualizarFigura);

/**
 * DELETE /figuras/:id
 * Elimina una figura de la colección.
 * Parámetro :id es el _id de la figura a eliminar
 * Ej: DELETE /figuras/507f1f77bcf86cd799439011
 * 
 * Respuesta esperada (200 - OK):
 * {
 *   success: true,
 *   message: "Figura eliminada exitosamente",
 *   data: { _id, nombre, anime, ... } (figura eliminada)
 * }
 * 
 * Si el :id no existe, devuelve error 404
 */
router.delete('/:id', figuraController.eliminarFigura);

// Exportar el router para que se use en app.js
// En app.js se monta con: app.use('/figuras', figuraRoutes);
module.exports = router;
