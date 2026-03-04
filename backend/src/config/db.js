// src/config/db.js
// Helper para gestionar la conexión a MongoDB desde la carpeta src/
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado (src/config/db)');
  } catch (err) {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
