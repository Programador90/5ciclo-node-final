const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const cors = require('cors');  // Para permitir las solicitudes de Angular

// Cargar las variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Servir archivos estáticos (si tienes)
app.use(express.static('public'));

// Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/vehiculos', require('./routes/vehiculos'));
app.use('/api/marcas', require('./routes/marcas'));
app.use('/api/documentos', require('./routes/documentos'));
app.use('/api/notificaciones', require('./routes/notificaciones'));
app.use('/api/roles', require('./routes/roles'));  // Añadir las rutas de roles
app.use('/api/anadirVehiculo', require('./routes/anadirVehiculoRoutes'));

// *** Añadir nuevas rutas para SOAT, SAT, CITV, y Revisión Técnica *** //
app.use('/api/soats', require('./routes/soatRoutes'));          // Rutas para SOAT
app.use('/api/sats', require('./routes/satRoutes'));            // Rutas para SAT (Papeletas/Multas)
app.use('/api/citvs', require('./routes/citvRoutes'));          // Rutas para CITV (Inspección Técnica)
app.use('/api/revision-tecnica', require('./routes/revisionTecnicaRoutes'));  // Rutas para Revisión Técnica

// Puerto desde .env o 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
