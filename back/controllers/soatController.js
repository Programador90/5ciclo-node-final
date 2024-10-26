const Soat = require('../models/Soat');

// Crear un nuevo SOAT
exports.createSoat = async (req, res) => {
  try {
    const { compania, inicio, fin, placa, certificado, uso, clase, estado, tipo, fechaCreacion } = req.body;

    // Verificar si el vehículo ya tiene un SOAT registrado
    let soatExistente = await Soat.findOne({ placa });
    if (soatExistente) {
      return res.status(400).json({ message: 'Ya existe un SOAT asociado a esta placa' });
    }

    const nuevoSoat = new Soat({
      compania,
      inicio,
      fin,
      placa,
      certificado,
      uso,
      clase,
      estado,
      tipo,
      fechaCreacion: fechaCreacion || new Date() // Establece fecha actual si no se proporciona
    });

    await nuevoSoat.save();
    return res.status(201).json({ message: 'SOAT añadido correctamente', nuevoSoat });
  } catch (error) {
    console.error('Error al crear el SOAT:', error);
    return res.status(500).json({ message: 'Error al crear el SOAT', error });
  }
};

// Obtener todos los SOAT
exports.getSoats = async (req, res) => {
  try {
    const soats = await Soat.find();
    return res.status(200).json(soats);
  } catch (error) {
    console.error('Error al obtener los SOAT:', error);
    return res.status(500).json({ message: 'Error al obtener los SOAT', error });
  }
};

// Obtener un SOAT por ID
exports.getSoatById = async (req, res) => {
  try {
    const soat = await Soat.findById(req.params.id);
    if (!soat) {
      return res.status(404).json({ message: 'SOAT no encontrado' });
    }
    return res.status(200).json(soat);
  } catch (error) {
    console.error('Error al obtener el SOAT:', error);
    return res.status(500).json({ message: 'Error al obtener el SOAT', error });
  }
};

// Eliminar un SOAT por ID
exports.deleteSoat = async (req, res) => {
  try {
    const soat = await Soat.findByIdAndDelete(req.params.id);
    if (!soat) {
      return res.status(404).json({ message: 'SOAT no encontrado' });
    }
    return res.status(200).json({ message: 'SOAT eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el SOAT:', error);
    return res.status(500).json({ message: 'Error al eliminar el SOAT', error });
  }
};

// Actualizar un SOAT por ID
exports.updateSoat = async (req, res) => {
  try {
    const { id } = req.params;

    // Actualizar SOAT
    const soatActualizado = await Soat.findByIdAndUpdate(id, req.body, { new: true });

    if (!soatActualizado) {
      return res.status(404).json({ message: 'SOAT no encontrado' });
    }

    return res.status(200).json({ message: 'SOAT actualizado', soatActualizado });
  } catch (error) {
    console.error('Error al actualizar el SOAT:', error);
    return res.status(500).json({ message: 'Error al actualizar el SOAT', error });
  }
};
