const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para la Revisión Técnica
const RevisionTecnicaSchema = new Schema({
  placa: { type: String, ref: 'AñadirVehiculo', required: true },
  nro_certificado: { type: String, required: true },  // Número del certificado
  fecha_revision: { type: Date, required: true },  // Fecha de la revisión técnica
  vigente_hasta: { type: Date, required: true },  // Fecha de vencimiento
  estado: { type: String, required: true },  // Estado de la revisión técnica
  sede: { type: String, required: true },  // Sede de la revisión técnica
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RevisionTecnica', RevisionTecnicaSchema);
