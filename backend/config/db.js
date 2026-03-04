// Helper para la conexión a MongoDB (opcional)
const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado (config/db)');
  } catch (err) {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
