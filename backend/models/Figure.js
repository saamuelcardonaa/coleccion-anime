// Modelo Mongoose para una figura de anime en la colección
const mongoose = require('mongoose');

const FigureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  series: { type: String },
  manufacturer: { type: String },
  releaseYear: { type: Number },
  imageUrl: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Figure', FigureSchema);
