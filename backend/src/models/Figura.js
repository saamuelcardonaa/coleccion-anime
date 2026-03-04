// src/models/Figura.js
// Esquema Mongoose que representa una figura de anime en la colección.
// Define la estructura de datos y validaciones para las figuras almacenadas en MongoDB.
const mongoose = require('mongoose');

// Definir el esquema de la colección "Figura"
const FiguraSchema = new mongoose.Schema({
  // nombre: identificador principal de la figura (string, requerido)
  // Ej: "Saitama Statue", "Naruto POP Figure"
  nombre: {
    type: String,
    required: [true, 'El nombre de la figura es requerido'],
    trim: true,
  },

  // anime: nombre del anime del cual proviene la figura (string, requerido)
  // Ej: "One Punch Man", "Naruto", "Attack on Titan"
  anime: {
    type: String,
    required: [true, 'El anime es requerido'],
    trim: true,
  },

  // personaje: nombre del personaje representado en la figura (string, opcional)
  // Ej: "Saitama", "Naruto Uzumaki", "Eren Yeager"
  personaje: {
    type: String,
    trim: true,
  },

  // precio: costo de la figura en unidades monetarias (number)
  // Ej: 29.99, 49.99
  precio: {
    type: Number,
    default: 0,
    min: [0, 'El precio no puede ser negativo'],
  },

  // stock: cantidad de figuras disponibles en inventario (number)
  // Ej: 5, 10, 0
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo'],
  },

  // imagen: URL de la imagen de la figura (string, opcional)
  // Ej: "https://ejemplo.com/imagen.jpg"
  imagen: {
    type: String,
  },

  // Timestamps automáticos: createdAt y updatedAt
  // Se crean o actualizan automáticamente cuando el documento se guarda
}, { timestamps: true });

// Exportar el modelo "Figura" basado en el esquema definido
// Esto permite usar este modelo en otros archivos para consultas a la BD
module.exports = mongoose.model('Figura', FiguraSchema);
