const express = require('express');
const router = express.Router();

// Definir tus rutas aquí
router.get('/', (req, res) => {
    res.send('Lista de vehiculos');
});

// Exportar el router
module.exports = router;
