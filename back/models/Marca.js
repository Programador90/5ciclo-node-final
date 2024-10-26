const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marcaSchema = new Schema({
    nombre_marca: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Marca', marcaSchema);
