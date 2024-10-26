const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true  // Limpia espacios en blanco al principio y al final
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true  // Limpia espacios en blanco
  },
  password: {
    type: String,
    required: true  // Aquí asegúrate de guardar la contraseña **encriptada**
  },
  telefono: {
    type: String,
    trim: true  // El número de teléfono es opcional
  },
  fecha_registro: {
    type: Date,
    default: Date.now  // Fecha automática de creación del usuario
  },
  rol: {
    type: Schema.Types.ObjectId,
    ref: 'Rol',  // Referencia al modelo "Rol"
    required: true  // Cada usuario debe tener un rol
  }
});

// Método para hacer hash a la contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Exportar el modelo para poder usarlo en otras partes de la aplicación
module.exports = mongoose.model('Usuario', usuarioSchema);
