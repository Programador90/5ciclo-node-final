const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolSchema = new Schema({
  nombre_rol: {
    type: String,
    required: true,  // El nombre del rol es obligatorio
    unique: true  // Evita que haya duplicados de roles con el mismo nombre
  }
});

// Exportar el modelo para poder usarlo en otras partes de la aplicación
module.exports = mongoose.model('Rol', rolSchema);
