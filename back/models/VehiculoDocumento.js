const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculoDocumentoSchema = new Schema({
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo', // Relación con el vehículo
        required: true
    },
    soat: {
        compania: String,
        certificado: String,
        inicio: Date,
        fin: Date,
        estado: {
            type: String,
            enum: ['Activo', 'Vencido']
        }
    },
    revision_tecnica: {
        nro_certificado: String,
        vigencia_desde: Date,
        vigencia_hasta: Date,
        resultado: String, // Aprobado, Desaprobado
        estado: {
            type: String,
            enum: ['Vigente', 'Vencido']
        }
    },
    tarjeta_propiedad: {
        nro_serie: String,
        vin: String,
        motor: String,
        color: String,
        marca: String,
        modelo: String,
        estado: {
            type: String,
            enum: ['En circulación', 'Fuera de circulación']
        },
        propietarios: [String], // Lista de propietarios del vehículo
        placa: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VehiculoDocumento', vehiculoDocumentoSchema);
