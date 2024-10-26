const express = require('express');
const router = express.Router();
const marcasController = require('../controllers/marcasController');

// Obtener todas las marcas
router.get('/', marcasController.getMarcas);

// Obtener una marca por ID
router.get('/:id', marcasController.getMarcaById);

// Crear una nueva marca
router.post('/', marcasController.createMarca);

// Actualizar una marca existente
router.put('/:id', marcasController.updateMarca);

// Eliminar una marca
router.delete('/:id', marcasController.deleteMarca);

module.exports = router;
