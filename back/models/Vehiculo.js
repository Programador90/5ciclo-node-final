const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',  // Referencia al modelo "Usuario"
    required: true  // Cada vehículo debe tener un propietario
  },
  marca: {
    type: String,
    required: true  // Marca del vehículo es obligatoria
  },
  modelo: {
    type: String,
    required: true  // Modelo del vehículo es obligatorio
  },
  anio: {
    type: Number,
    required: true  // Año del vehículo es obligatorio
  },
  placa: {
    type: String,
    required: true,
    unique: true  // La placa debe ser única para cada vehículo
  },
  tipo_vehiculo: {
    type: String,
    enum: ['Auto', 'Moto', 'Camion', 'Otro'],  // Valores permitidos
    required: true  // Tipo de vehículo es obligatorio
  }
});

// Exportar el modelo para poder usarlo en otras partes de la aplicación
module.exports = mongoose.model('Vehiculo', vehiculoSchema);
