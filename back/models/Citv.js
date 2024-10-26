const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para el CITV (Certificado de Inspección Técnica Vehicular)
const CitvSchema = new Schema({
  placa: { type: String, ref: 'AñadirVehiculo', required: true },
  certificado_numero: { type: String, required: true },  // Número del certificado
  vigente_desde: { type: Date, required: true },  // Fecha de inicio de vigencia
  vigente_hasta: { type: Date, required: true },  // Fecha de fin de vigencia
  estado: { type: String, required: true },  // Estado del CITV
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Citv', CitvSchema);
