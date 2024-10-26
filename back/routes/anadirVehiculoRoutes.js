const express = require('express');
const router = express.Router();
const anadirVehiculoController = require('../controllers/anadirVehiculoController');

// Crear un nuevo vehículo
router.post('/', anadirVehiculoController.createAñadirVehiculo);

// Obtener todos los vehículos
router.get('/', anadirVehiculoController.getAñadirVehiculos);

// Eliminar un vehículo por ID
router.delete('/:id', anadirVehiculoController.deleteAñadirVehiculo);

// Actualizar un vehículo existente
router.put('/:id', anadirVehiculoController.updateAñadirVehiculo);

module.exports = router;
