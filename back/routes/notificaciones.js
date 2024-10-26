const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificacionesController');

// Ruta para obtener todas las notificaciones
router.get('/', notificacionesController.getNotificaciones);

// Ruta para obtener una notificación por ID
router.get('/:id', notificacionesController.getNotificacionById);

// Ruta para crear una nueva notificación
router.post('/', notificacionesController.createNotificacion);

// Ruta para actualizar una notificación existente
router.put('/:id', notificacionesController.updateNotificacion);

// Ruta para eliminar una notificación
router.delete('/:id', notificacionesController.deleteNotificacion);

module.exports = router;
