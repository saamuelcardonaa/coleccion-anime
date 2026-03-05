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
const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:5173",
  "https://coleccion-anime-react.vercel.app",
  "https://coleccion-anime-angular.vercel.app"
];


const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware para evitar caché del CDN antes de las rutas
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

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