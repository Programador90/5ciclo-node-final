const RevisionTecnica = require('../models/RevisionTecnica');

// Crear una nueva Revisión Técnica
exports.createRevisionTecnica = async (req, res) => {
  try {
    const { placa, fechaRevision, resultado, vencimiento } = req.body;

    const nuevaRevision = new RevisionTecnica({ placa, fechaRevision, resultado, vencimiento });
    await nuevaRevision.save();
    res.json({ message: 'Revisión Técnica añadida correctamente', nuevaRevision });
  } catch (error) {
    console.error('Error al crear la Revisión Técnica:', error);
    res.status(500).json({ message: 'Error al crear la Revisión Técnica', error });
  }
};

// Obtener todas las Revisión Técnicas
exports.getRevisionesTecnicas = async (req, res) => {
  try {
    const revisiones = await RevisionTecnica.find();
    res.json(revisiones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las Revisión Técnicas', error });
  }
};

// Obtener una Revisión Técnica por ID
exports.getRevisionTecnicaById = async (req, res) => {
  try {
    const revision = await RevisionTecnica.findById(req.params.id);
    if (!revision) {
      return res.status(404).json({ message: 'Revisión Técnica no encontrada' });
    }
    res.json(revision);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la Revisión Técnica', error });
  }
};

// Eliminar una Revisión Técnica por ID
exports.deleteRevisionTecnica = async (req, res) => {
  try {
    const revision = await RevisionTecnica.findByIdAndDelete(req.params.id);
    if (!revision) {
      return res.status(404).json({ message: 'Revisión Técnica no encontrada' });
    }
    res.json({ message: 'Revisión Técnica eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la Revisión Técnica', error });
  }
};

// Actualizar una Revisión Técnica por ID
exports.updateRevisionTecnica = async (req, res) => {
  try {
    const revision = await RevisionTecnica.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!revision) {
      return res.status(404).json({ message: 'Revisión Técnica no encontrada' });
    }
    res.json({ message: 'Revisión Técnica actualizada', revision });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la Revisión Técnica', error });
  }
};
