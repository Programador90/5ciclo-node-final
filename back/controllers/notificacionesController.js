const Notificacion = require('../models/Notificacion'); // Modelo de notificación
const VehiculoDocumento = require('../models/VehiculoDocumento'); // Relacionado a los documentos de los vehículos

// Obtener todas las notificaciones
exports.getNotificaciones = async (req, res) => {
    try {
        const notificaciones = await Notificacion.find().populate('id_vehiculo_documento');
        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notificaciones', error });
    }
};

// Obtener una notificación por ID
exports.getNotificacionById = async (req, res) => {
    try {
        const notificacion = await Notificacion.findById(req.params.id).populate('id_vehiculo_documento');
        if (!notificacion) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }
        res.json(notificacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la notificación', error });
    }
};

// Crear una nueva notificación
exports.createNotificacion = async (req, res) => {
    try {
        const { id_vehiculo_documento, mensaje } = req.body;
        
        const vehiculoDocumento = await VehiculoDocumento.findById(id_vehiculo_documento);
        if (!vehiculoDocumento) {
            return res.status(404).json({ message: 'Documento del vehículo no encontrado' });
        }

        const nuevaNotificacion = new Notificacion({
            id_vehiculo_documento,
            mensaje
        });
        
        await nuevaNotificacion.save();
        res.json({ message: 'Notificación creada correctamente', nuevaNotificacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la notificación', error });
    }
};

// Actualizar una notificación existente
exports.updateNotificacion = async (req, res) => {
    try {
        const { id_vehiculo_documento, mensaje } = req.body;

        const notificacion = await Notificacion.findByIdAndUpdate(req.params.id, { id_vehiculo_documento, mensaje }, { new: true });
        if (!notificacion) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        res.json({ message: 'Notificación actualizada', notificacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la notificación', error });
    }
};

// Eliminar una notificación
exports.deleteNotificacion = async (req, res) => {
    try {
        const notificacion = await Notificacion.findByIdAndDelete(req.params.id);
        if (!notificacion) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        res.json({ message: 'Notificación eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la notificación', error });
    }
};
