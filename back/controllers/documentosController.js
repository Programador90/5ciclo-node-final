const Documento = require('../models/Documento'); // Asegúrate de tener este modelo

// Obtener todos los documentos
exports.getDocumentos = async (req, res) => {
    try {
        const documentos = await Documento.find();
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los documentos', error });
    }
};

// Obtener un documento por ID
exports.getDocumentoById = async (req, res) => {
    try {
        const documento = await Documento.findById(req.params.id);
        if (!documento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }
        res.json(documento);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el documento', error });
    }
};

// Crear un nuevo documento
exports.createDocumento = async (req, res) => {
    try {
        const { nombre_documento } = req.body;
        
        const nuevoDocumento = new Documento({ nombre_documento });
        await nuevoDocumento.save();
        res.json({ message: 'Documento creado correctamente', nuevoDocumento });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el documento', error });
    }
};

// Actualizar un documento existente
exports.updateDocumento = async (req, res) => {
    try {
        const { nombre_documento } = req.body;

        const documento = await Documento.findByIdAndUpdate(req.params.id, { nombre_documento }, { new: true });
        if (!documento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }

        res.json({ message: 'Documento actualizado', documento });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el documento', error });
    }
};

// Eliminar un documento
exports.deleteDocumento = async (req, res) => {
    try {
        const documento = await Documento.findByIdAndDelete(req.params.id);
        if (!documento) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }

        res.json({ message: 'Documento eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el documento', error });
    }
};
