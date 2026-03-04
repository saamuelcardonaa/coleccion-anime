// src/middlewares/index.js
// Carpeta para middlewares personalizados (autenticación, logging, validación, etc.).
// Este archivo es un placeholder con documentación para que un profesor entienda
// dónde colocar middlewares y cómo exportarlos.

// Ejemplo de middleware de logging simple:
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

module.exports = {
  requestLogger,
};
