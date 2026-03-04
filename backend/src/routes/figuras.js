// src/routes/figuras.js
// Enrutador dedicado a las operaciones CRUD y Jikan para figuras.
// Todas las rutas están versionadas bajo `/api/v1/figuras` en app.js.

import { Router } from 'express';
import {
  obtenerFiguras,
  obtenerFiguraPorId,
  crearFigura,
  actualizarFigura,
  eliminarFigura,
  obtenerAnimeJikanPorMalId,
} from '../controllers/figurasController.js';

const router = Router();

// Rutas principales siguiendo la "referencia profesional" solicitada
router.get('/get/all', obtenerFiguras);
router.get('/get/:id', obtenerFiguraPorId);
router.post('/post', crearFigura);
router.patch('/update/:id', actualizarFigura);
router.delete('/delete/:id', eliminarFigura);

// Endpoint adicional para Jikan API
router.get('/jikan/:malId', obtenerAnimeJikanPorMalId);

export default router;