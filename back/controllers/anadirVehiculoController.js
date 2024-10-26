const AñadirVehiculo = require('../models/AñadirVehiculo');

// Controlador para crear un nuevo vehículo
exports.createAñadirVehiculo = async (req, res) => {
  try {
    const { placa, tipo_persona, dni, ruc, partida_registral } = req.body;

    if (tipo_persona === 'Natural' && !dni) {
      return res.status(400).json({ message: 'DNI es requerido para personas naturales' });
    }
    if (tipo_persona === 'Juridica' && !ruc) {
      return res.status(400).json({ message: 'RUC es requerido para personas jurídicas' });
    }

    const nuevoVehiculo = new AñadirVehiculo({ placa, tipo_persona, dni, ruc, partida_registral });
    await nuevoVehiculo.save();
    
    res.json({ message: 'Vehículo añadido correctamente', nuevoVehiculo });
  } catch (error) {
    console.error('Error al crear el vehículo:', error);
    res.status(500).json({ message: 'Error al crear el vehículo', error });
  }
};

// Obtener todos los vehículos añadidos
exports.getAñadirVehiculos = async (req, res) => {
  try {
    const vehiculos = await AñadirVehiculo.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vehículos', error });
  }
};

// Eliminar un vehículo por ID
exports.deleteAñadirVehiculo = async (req, res) => {
  try {
    const vehiculo = await AñadirVehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json({ message: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vehículo', error });
  }
};

// Actualizar un vehículo existente
exports.updateAñadirVehiculo = async (req, res) => {
  try {
    const { placa, tipo_persona, dni, ruc, partida_registral } = req.body;

    const vehiculo = await AñadirVehiculo.findByIdAndUpdate(
      req.params.id,
      { placa, tipo_persona, dni, ruc, partida_registral },
      { new: true }
    );
    
    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }
    res.json({ message: 'Vehículo actualizado', vehiculo });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el vehículo', error });
  }
};
