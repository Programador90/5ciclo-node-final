const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacionSchema = new Schema({
    vehiculo_documento: {
        type: Schema.Types.ObjectId,
        ref: 'VehiculoDocumento',
        required: true
    },
    fecha_notificacion: {
        type: Date,
        default: Date.now
    },
    mensaje: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notificacion', notificacionSchema);
