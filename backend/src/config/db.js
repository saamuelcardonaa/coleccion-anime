// src/config/db.js
// Encapsula la lógica de conexión a MongoDB utilizando Mongoose.
// Diseñado para funcionar tanto en entornos tradicionales como serverless (Vercel, Netlify).

import mongoose from 'mongoose';

// Bandera para evitar reconectar en caso de que ya exista una conexión activa
let isConnected = false;

async function connectDB(uri) {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error('Error conectando a MongoDB', err);
    process.exit(1); // detener la aplicación si no se puede conectar
  }
}

export default connectDB;
