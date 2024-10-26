const Vehiculo = require('../models/Vehiculo');

// Obtener todos los vehículos
exports.getVehiculos = async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body);
    // Poblamos el campo `usuario` para obtener el nombre del propietario
    const vehiculos = await Vehiculo.find().populate('usuario', 'nombre');
    res.json(vehiculos);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ message: 'Error al obtener los vehículos' });
  }
};


exports.createVehiculo = async (req, res) => {
  try {
    const { usuario, marca, modelo, anio, placa, tipo_vehiculo } = req.body;

    // Verifica que todos los campos estén presentes
    if (!usuario || !marca || !modelo || !anio || !placa || !tipo_vehiculo) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    console.log('Datos recibidos en el backend:', req.body);

    // Crear el nuevo vehículo
    const nuevoVehiculo = new Vehiculo({
      usuario,  // Este debe ser el ObjectId del usuario (propietario)
      marca,
      modelo,
      anio,
      placa,
      tipo_vehiculo
    });

    // Guardar en la base de datos
    await nuevoVehiculo.save();
    res.json({ message: 'Vehículo creado correctamente', vehiculo: nuevoVehiculo });
  } catch (error) {
    console.error('Error al crear vehículo:', error);
    res.status(500).json({ message: 'Error al crear vehículo' });
  }
};


  





exports.updateVehiculo = async (req, res) => {
  try {
    const { usuario, marca, modelo, anio, placa, tipo_vehiculo } = req.body;

    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { usuario, marca, modelo, anio, placa, tipo_vehiculo },
      { new: true }  // Devuelve el vehículo actualizado
    );

    if (!vehiculoActualizado) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.json(vehiculoActualizado);
  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    res.status(500).json({ message: 'Error al actualizar vehículo' });
  }
};


// Eliminar un vehículo
exports.deleteVehiculo = async (req, res) => {
  try {
    await Vehiculo.findByIdAndDelete(req.params.id);
    res.json({ message: `Vehículo con ID ${req.params.id} eliminado` });
  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    res.status(500).json({ message: 'Error al eliminar vehículo' });
  }
};
