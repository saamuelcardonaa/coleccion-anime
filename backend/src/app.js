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
// Configuración CORS dinámica para localhost, .vercel.app y Postman
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Permitir herramientas como Postman
    if (origin.startsWith('http://localhost:')) return callback(null, true);
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
// Aplicar CORS antes de las rutas
app.use(cors(corsOptions));
// Manejo explícito de preflight OPTIONS para todas las rutas
app.options('*', cors(corsOptions));
app.use(requestLogger);           // registra cada petición en la consola

// Versionado de API y ruta principal para figuras
// /api/v1/figuras -> todos los endpoints CRUD y Jikan
app.use('/api/v1/figuras', figurasRouter);

// Ruta raíz de salud
app.get('/', (req, res) => {
  res.json({ message: 'API Colección Anime en funcionamiento' });
});

export default app;
