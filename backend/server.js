// server.js
// Archivo de arranque local. No se usa en Vercel pero queda disponible
// para desarrollo (`npm run dev`) o despliegues tradicionales.

import 'dotenv/config';
import connectDB from './src/config/db.js';
import app from './src/app.js';

// La variable de entorno debe llamarse MONGODB_URI según la especificación.
// Si no está presente, usamos el valor por defecto para entornos locales.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coleccion-anime';
const PORT = process.env.PORT || 5000;

connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
