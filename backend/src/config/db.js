// src/config/db.js
// Encapsula la lógica de conexión a MongoDB utilizando Mongoose.
// Diseñado para funcionar tanto en local como en entornos serverless (Vercel).

import mongoose from "mongoose";

// Bandera para evitar reconectar si ya existe una conexión activa
let isConnected = false;

async function connectDB() {
  // Si ya estamos conectados, no hacemos nada
  if (isConnected) return;

  // Leemos la URI desde variables de entorno
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI no está definida. Revisa backend/.env (local) o las Environment Variables en Vercel."
    );
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error conectando a MongoDB", err);
    process.exit(1);
  }
}

export default connectDB;