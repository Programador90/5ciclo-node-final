const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculosController');

// Definir las rutas para los vehículos
router.get('/', vehiculosController.getVehiculos);  // Obtener todos los vehículos
router.post('/', vehiculosController.createVehiculo);  // Crear un nuevo vehículo
router.put('/:id', vehiculosController.updateVehiculo);  // Actualizar un vehículo
router.delete('/:id', vehiculosController.deleteVehiculo);  // Eliminar un vehículo

module.exports = router;
