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
// Configuración CORS con whitelist
const whitelist = [
  'http://localhost:4200',
  // TODO: reemplaza este dominio por el de tu frontend en producción
  'https://coleccion-anime.vercel.app/api/v1/figuras/get/all'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Permite requests sin origin (como Postman)
    if (whitelist.some(entry => typeof entry === 'string' ? entry === origin : entry.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
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
