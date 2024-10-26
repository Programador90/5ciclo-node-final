const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios con el nombre de su rol
exports.getUsuarios = async (req, res) => {
  try {
    // Poblamos el campo `rol` con el nombre del rol
    const usuarios = await Usuario.find().populate('rol', 'nombre_rol');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, telefono, rol } = req.body;

    // Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password,  // Recuerda encriptar el password
      telefono,
      rol  // Aquí se espera un ObjectId que referencie a un rol existente
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario' });
  }
};


// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, telefono, rol } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, telefono, rol },
      { new: true }  // Devuelve el usuario actualizado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el usuario' });
  }
};


// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
///
///
///
// Controlador para registrar un usuario
exports.registrarUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    usuario = new Usuario({ email, password });
    await usuario.save();

    const token = jwt.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para iniciar sesión
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ usuarioId: usuario._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para obtener los datos del usuario autenticado
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};