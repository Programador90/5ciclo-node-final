// app.js
const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const Usuario = require('./models/Usuario');
const cors = require('cors');  // Para permitir las solicitudes de Angular

// Cargar las variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB();

const app = express();

// Middleware para aceptar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());  // Permitir solicitudes del frontend (Angular)

// Servir archivos estáticos (si necesitas imágenes, CSS o JavaScript)
app.use(express.static('public'));

// Rutas de la API REST
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();  // Traer todos los usuarios de la base de datos
        res.json(usuarios);  // Devolver usuarios en formato JSON
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const existeUsuario = await Usuario.findOne({ email: email.trim() });
        if (existeUsuario) {
            return res.status(400).json({ message: 'Error: El correo ya está registrado' });
        }

        const nuevoUsuario = new Usuario({ nombre: nombre.trim(), email: email.trim() });
        await nuevoUsuario.save();
        res.json({ message: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        await Usuario.findByIdAndUpdate(req.params.id, { 
            nombre: nombre.trim(), 
            email: email.trim() 
        });
        res.json({ message: `Usuario con ID ${req.params.id} actualizado` });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});

app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const usuarioId = req.params.id;
        await Usuario.findByIdAndDelete(usuarioId);
        res.json({ message: `Usuario con ID ${usuarioId} eliminado` });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

// Puerto desde el .env o 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
