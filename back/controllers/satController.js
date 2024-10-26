const Sat = require('../models/Sat');

// Crear un nuevo registro de SAT
exports.createSat = async (req, res) => {
  try {
    const { placa, multas } = req.body;

    // Validación básica de datos
    if (!placa || !multas || !Array.isArray(multas) || multas.length === 0) {
      return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
    }

    // Crear una nueva instancia de SAT
    const nuevoSat = new Sat({
      placa,
      multas,
      createdAt: new Date()  // Fecha de creación actual
    });

    // Guardar en la base de datos
    await nuevoSat.save();

    res.json({ message: 'SAT creado correctamente', nuevoSat });
  } catch (error) {
    console.error('Error al crear el SAT:', error);
    res.status(500).json({ message: 'Error al crear el SAT', error });
  }
};

// Obtener todos los registros de SAT
exports.getSats = async (req, res) => {  // Cambio de nombre a getSats
  try {
    const sats = await Sat.find();  // Obtener todos los SATs
    res.json(sats);  // Enviar la respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los SATs:', error);
    res.status(500).json({ message: 'Error al obtener los SATs', error });
  }
};

// Obtener un SAT por su ID
exports.getSatById = async (req, res) => {
  try {
    const sat = await Sat.findById(req.params.id);
    if (!sat) {
      return res.status(404).json({ message: 'SAT no encontrado' });
    }
    res.json(sat);
  } catch (error) {
    console.error('Error al obtener el SAT:', error);
    res.status(500).json({ message: 'Error al obtener el SAT', error });
  }
};

// Eliminar un SAT por su ID
exports.deleteSat = async (req, res) => {
  try {
    const sat = await Sat.findByIdAndDelete(req.params.id);
    if (!sat) {
      return res.status(404).json({ message: 'SAT no encontrado' });
    }
    res.json({ message: 'SAT eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el SAT:', error);
    res.status(500).json({ message: 'Error al eliminar el SAT', error });
  }
};

// Actualizar un SAT por su ID
exports.updateSat = async (req, res) => {
  try {
    // Actualizar el registro basado en el ID y los datos proporcionados en req.body
    const sat = await Sat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sat) {
      return res.status(404).json({ message: 'SAT no encontrado' });
    }
    res.json({ message: 'SAT actualizado correctamente', sat });
  } catch (error) {
    console.error('Error al actualizar el SAT:', error);
    res.status(500).json({ message: 'Error al actualizar el SAT', error });
  }
};
