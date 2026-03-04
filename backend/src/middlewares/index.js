// src/middlewares/index.js
// Middleware personalizado agrupado.
// Se usa solo un logger sencillo, pero aquí es donde se añadirían
// autenticación, validación de JWT, etc.

export function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

// Si en el futuro queréis exportar más middlewares, agregadlos aquí

