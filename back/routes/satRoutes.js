const express = require('express');
const router = express.Router();
const satController = require('../controllers/satController');

// Crear un nuevo registro de SAT
router.post('/', satController.createSat);

// Obtener todos los registros de SAT
router.get('/', satController.getSats);

// Obtener un registro de SAT por ID
router.get('/:id', satController.getSatById);

// Actualizar un registro de SAT por ID
router.put('/:id', satController.updateSat);

// Eliminar un registro de SAT por ID
router.delete('/:id', satController.deleteSat);

module.exports = router;
