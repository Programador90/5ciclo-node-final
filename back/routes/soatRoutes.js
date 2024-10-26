const express = require('express');
const router = express.Router();
const soatController = require('../controllers/soatController');

// Crear un nuevo SOAT
router.post('/', soatController.createSoat);

// Obtener todos los SOAT
router.get('/', soatController.getSoats);

// Obtener un SOAT por ID
router.get('/:id', soatController.getSoatById);

// Actualizar un SOAT por ID
router.put('/:id', soatController.updateSoat);

// Eliminar un SOAT por ID
router.delete('/:id', soatController.deleteSoat);

module.exports = router;