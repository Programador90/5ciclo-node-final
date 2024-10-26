// models/AñadirVehiculo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anadirVehiculoSchema = new Schema({
  placa: { type: String, required: true, unique: true },  // La placa es única
  tipo_persona: { type: String, enum: ['Natural', 'Juridica'], required: true },  // Puede ser Natural o Jurídica
  dni: { type: String, required: function() { return this.tipo_persona === 'Natural'; } },  // Obligatorio solo si es natural
  ruc: { type: String, required: function() { return this.tipo_persona === 'Juridica'; } },  // Obligatorio solo si es jurídica
  partida_registral: { type: String, required: true, unique: true },  // Número de partida registral única
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AñadirVehiculo', anadirVehiculoSchema);
