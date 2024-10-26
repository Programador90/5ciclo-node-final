const Rol = require('../models/Rol');

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los roles' });
  }
};



exports.createRol = async (req, res) => {
    try {
      const { nombre_rol } = req.body;
  
      if (!nombre_rol) {
        return res.status(400).json({ message: 'El nombre del rol es requerido.' });
      }
  
      const nuevoRol = new Rol({ nombre_rol });
      await nuevoRol.save();
      res.json({ message: 'Rol creado', rol: nuevoRol });
    } catch (error) {
      console.error('Error al crear rol:', error);
      res.status(500).json({ message: 'Error al crear el rol' });
    }
  };
  


// Actualizar rol
exports.updateRol = async (req, res) => {
    try {
        const { nombre_rol } = req.body;
        await Rol.findByIdAndUpdate(req.params.id, { nombre_rol });
        res.json({ message: 'Rol actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el rol' });
    }
};

// Eliminar rol
exports.deleteRol = async (req, res) => {
    try {
        await Rol.findByIdAndDelete(req.params.id);
        res.json({ message: 'Rol eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rol' });
    }
};
