// src/app.js
// Configuración de la aplicación Express independentemente del servidor.
// Se exporta `app` para que pueda ser instanciado por `server.js` o por Vercel.

import express from 'express';
import cors from 'cors';
import figurasRouter from './routes/figuras.js';
import { requestLogger } from './middlewares/index.js';

const app = express();

// Middlewares generales
app.use(express.json());          // parsea JSON en el cuerpo de las solicitudes
app.use(cors());                  // habilita CORS para permitir peticiones desde el frontend
app.use(requestLogger);           // registra cada petición en la consola

// Versionado de API y ruta principal para figuras
// /api/v1/figuras -> todos los endpoints CRUD y Jikan
app.use('/api/v1/figuras', figurasRouter);

// Ruta raíz de salud
app.get('/', (req, res) => {
  res.json({ message: 'API Colección Anime en funcionamiento' });
});

export default app;
