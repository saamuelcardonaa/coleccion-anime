// backend/api/index.js
// Este archivo es el entrypoint que Vercel ejecuta para cada request.
// Exporta la aplicación Express y se encarga de conectar la base de datos.

import 'dotenv/config';
import connectDB from '../src/config/db.js';
import app from '../src/app.js';

// Vercel invoca repetidamente este módulo; conectar la base de datos
// sólo una vez, por eso connectDB maneja internamente la bandera.
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn('Warning: MONGODB_URI no está definido. Comprueba .env');
}
connectDB(MONGODB_URI);

export default app;
