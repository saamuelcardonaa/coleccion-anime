// server.js
// Punto de entrada del backend (en la raíz de la carpeta `backend`).
// Carga variables de entorno, conecta a la base de datos y arranca el servidor Express.
require('dotenv').config();
const connectDB = require('./src/config/db');
const app = require('./src/app');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/coleccion-anime';
connectDB(MONGO_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor backend escuchando en puerto ${PORT}`));
