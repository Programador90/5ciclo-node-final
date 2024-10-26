const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');


// CRUD rutas para usuarios
router.get('/', usuariosController.getUsuarios);  // Leer todos los usuarios
router.post('/', usuariosController.createUsuario);  // Crear un nuevo usuario
router.put('/:id', usuariosController.updateUsuario);  // Actualizar un usuario existente
router.delete('/:id', usuariosController.deleteUsuario);  // Eliminar un usuario


// Ruta para registrar usuarios
router.post('/register', usuarioController.registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', usuarioController.loginUsuario);

// Ruta protegida para obtener datos del usuario autenticado
router.get('/me', authMiddleware, usuarioController.obtenerUsuario);
module.exports = router;
