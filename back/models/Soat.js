const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soatSchema = new Schema({
  compania: {
    type: String,
    required: true,
  },
  inicio: {
    type: Date,
    required: true,
  },
  fin: {
    type: Date,
    required: true,
  },
  placa: {
    type: String,
    required: true,
  },
  certificado: {
    type: String,
    required: true,
  },
  uso: {
    type: String,
    required: true,
  },
  clase: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,  // Puede ser "Activo" o "Vencido"
  },
  tipo: {
    type: String,
    required: true,  // Puede ser "Digital" o "Físico"
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaAnulacion: {
    type: Date,
    default: null, // Puede ser null si no ha sido anulado
  }
});

module.exports = mongoose.model('Soat', soatSchema);
