// Compatibilidad: este archivo delega al nuevo `server.js`.
// Mantener este archivo permite ejecutar el servidor con herramientas
// que todavía apunten a `index.js`.
module.exports = require('./server.js');
