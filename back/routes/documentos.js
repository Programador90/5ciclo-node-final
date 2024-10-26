const express = require('express');
const router = express.Router();
const documentosController = require('../controllers/documentosController');

// Obtener todos los documentos
router.get('/', documentosController.getDocumentos);

// Obtener un documento por ID
router.get('/:id', documentosController.getDocumentoById);

// Crear un nuevo documento
router.post('/', documentosController.createDocumento);

// Actualizar un documento existente
router.put('/:id', documentosController.updateDocumento);

// Eliminar un documento
router.delete('/:id', documentosController.deleteDocumento);

module.exports = router;
