const Citv = require('../models/Citv');

// Crear un nuevo CITV
exports.createCitv = async (req, res) => {
  try {
    const { placa, fechaInspeccion, resultado, vencimiento } = req.body;

    // Validar si ya existe un CITV vigente para la placa
    const citvExistente = await Citv.findOne({ placa, vencimiento: { $gte: new Date() } });
    if (citvExistente) {
      return res.status(400).json({ message: 'Ya existe un CITV vigente para esta placa' });
    }

    const nuevoCitv = new Citv({ placa, fechaInspeccion, resultado, vencimiento });
    await nuevoCitv.save();
    res.json({ message: 'CITV añadido correctamente', nuevoCitv });
  } catch (error) {
    console.error('Error al crear el CITV:', error);
    res.status(500).json({ message: 'Error al crear el CITV', error });
  }
};

// Obtener todos los CITV
exports.getCitvs = async (req, res) => {
  try {
    const citvs = await Citv.find();
    res.json(citvs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los CITV', error });
  }
};

// Obtener un CITV por ID
exports.getCitvById = async (req, res) => {
  try {
    const citv = await Citv.findById(req.params.id);
    if (!citv) {
      return res.status(404).json({ message: 'CITV no encontrado' });
    }
    res.json(citv);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el CITV', error });
  }
};

// Eliminar un CITV por ID
exports.deleteCitv = async (req, res) => {
  try {
    const citv = await Citv.findByIdAndDelete(req.params.id);
    if (!citv) {
      return res.status(404).json({ message: 'CITV no encontrado' });
    }
    res.json({ message: 'CITV eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el CITV', error });
  }
};

// Actualizar un CITV por ID
exports.updateCitv = async (req, res) => {
  try {
    const citv = await Citv.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!citv) {
      return res.status(404).json({ message: 'CITV no encontrado' });
    }
    res.json({ message: 'CITV actualizado', citv });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el CITV', error });
  }
};
