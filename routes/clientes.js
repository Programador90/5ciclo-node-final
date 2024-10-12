const express = require('express')
const router = express.Router()

const clienteController = require('../controllers/clienteController')

//Mostrar todos los clientes (GET)

router.get('/', clienteController.mostrar)

//Crear cliente (POST)
router.post('/crear', clienteController.crear)

//Editar cliente (POST)
router.post('/editar', clienteController.editar)

//Borrar cliente (GET)
router.get('/borrar/:id', clienteController.borrar)

module.exports = router


