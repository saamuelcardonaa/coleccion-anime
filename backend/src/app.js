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

// Añadir Vary y Cache-Control antes de CORS
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin");
  res.setHeader("Cache-Control", "no-store");
  next();
});

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
    if (!origin) return callback(null, true); // Permitir Postman y server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Permitir previews de Vercel (coleccion-anime-git-*, *-saamuelcardonaas-projects.vercel.app)
    if (/^https:\/\/coleccion-anime-git-[^\.]+\.vercel\.app$/.test(origin)) return callback(null, true);
    if (/^https:\/\/[\w-]+-saamuelcardonaas-projects\.vercel\.app$/.test(origin)) return callback(null, true);
    if (origin.endsWith('.vercel.app')) return callback(null, true); // fallback para otros previews
    callback(new Error("No permitido por CORS"));
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