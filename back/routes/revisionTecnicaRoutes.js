const express = require('express');
const router = express.Router();
const revisionTecnicaController = require('../controllers/revisionTecnicaController');

// Crear una nueva Revisión Técnica
router.post('/', revisionTecnicaController.createRevisionTecnica);

// Obtener todas las Revisiones Técnicas
router.get('/', revisionTecnicaController.getRevisionesTecnicas);

// Obtener una Revisión Técnica por ID
router.get('/:id', revisionTecnicaController.getRevisionTecnicaById);

// Actualizar una Revisión Técnica por ID
router.put('/:id', revisionTecnicaController.updateRevisionTecnica);

// Eliminar una Revisión Técnica por ID
router.delete('/:id', revisionTecnicaController.deleteRevisionTecnica);

module.exports = router;
