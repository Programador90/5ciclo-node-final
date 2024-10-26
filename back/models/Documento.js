const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentoSchema = new Schema({
    nombre_documento: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Documento', documentoSchema);
