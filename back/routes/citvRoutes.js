const express = require('express');
const router = express.Router();
const citvController = require('../controllers/citvController');

// Crear un nuevo CITV
router.post('/', citvController.createCitv);

// Obtener todos los CITV
router.get('/', citvController.getCitvs);

// Obtener un CITV por ID
router.get('/:id', citvController.getCitvById);

// Actualizar un CITV por ID
router.put('/:id', citvController.updateCitv);

// Eliminar un CITV por ID
router.delete('/:id', citvController.deleteCitv);

module.exports = router;
