const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para el SAT (Papeletas/Multas)
const SatSchema = new Schema({
  placa: { type: String, ref: 'AñadirVehiculo', required: true },  // Relación con la placa del vehículo
  codigo_papeleta: { type: String, required: true },  // Código o número de la papeleta
  fecha_infraccion: { type: Date, required: true },  // Fecha de la infracción
  monto: { type: Number, required: true },  // Monto de la multa
  estado: { type: String, required: true },  // Estado de la multa (pagada, pendiente)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sat', SatSchema);
