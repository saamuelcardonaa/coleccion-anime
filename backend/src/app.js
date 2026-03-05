// src/app.js
// Configuración de la aplicación Express independientemente del servidor.
// Se exporta `app` para que pueda ser instanciado por `server.js` o por Vercel.

import express from 'express';
import cors from 'cors';
import figurasRouter from './routes/figuras.js';
import { requestLogger } from './middlewares/index.js';

const app = express();

// Middlewares generales
app.use(express.json()); // parsea JSON en el cuerpo de las solicitudes

// =====================
// CORS (Angular + React + Vercel)
// =====================
const whitelist = [
  'http://localhost:4200', // Angular dev
  'http://localhost:5173', // React dev (Vite)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir herramientas tipo Postman o llamadas server-to-server sin origin
    if (!origin) return callback(null, true);

    // Permitir localhost (Angular/React en dev)
    if (whitelist.includes(origin)) return callback(null, true);

    // Permitir despliegues en Vercel (frontends)
    // origin suele ser: https://tu-proyecto.vercel.app
    if (origin.endsWith('.vercel.app')) return callback(null, true);

    // Bloquear el resto
    return callback(new Error('No permitido por CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Aplica CORS antes de las rutas
app.use(cors(corsOptions));
// Preflight OPTIONS para todas las rutas
app.options('*', cors(corsOptions));

// Logger (después de CORS, da igual el orden pero así queda claro)
app.use(requestLogger);

// =====================
// Rutas
// =====================
// /api/v1/figuras -> todos los endpoints CRUD
app.use('/api/v1/figuras', figurasRouter);

// Ruta raíz de salud
app.get('/', (req, res) => {
  res.json({ message: 'API Colección Anime en funcionamiento' });
});

export default app;