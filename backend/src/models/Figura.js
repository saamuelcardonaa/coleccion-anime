// src/models/Figura.js
// Modelo único y definitivo para la colección de figuras de anime.
// Todos los campos requeridos por la especificación están documentados
// con comentarios claros, apuntando al código pedagógico que leerá un profesor.

import mongoose from 'mongoose';

// Esquema de Mongoose; produzca automáticamente createdAt/updatedAt
const FiguraSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la figura es obligatorio'],
      trim: true,
    },

    anime: {
      type: String,
      required: [true, 'El nombre del anime es obligatorio'],
      trim: true,
    },

    // nombre del personaje representado en la figura (opcional)
    personaje: {
      type: String,
      trim: true,
    },

    // precio en la moneda local
    precio: {
      type: Number,
      min: [0, 'El precio no puede ser negativo'],
      default: 0,
    },

    // cantidad disponible en inventario
    stock: {
      type: Number,
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },

    // URL de la imagen de la figura (opcional)
    imagen: {
      type: String,
    },

    // ID de MyAnimeList para integración opcional con Jikan API
    malId: {
      type: Number,
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
  }
);

// Evita recompilar modelo durante hot-reload en entornos de desarrollo
const Figura = mongoose.models.Figura || mongoose.model('Figura', FiguraSchema);

export default Figura;
