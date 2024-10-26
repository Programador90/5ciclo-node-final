// config/db.js
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Leer la URI desde las variables de entorno
const url = process.env.DB_URI;

// Verificar que la URI no sea undefined
if (!url) {
    console.error('Error: La URI de la base de datos no está definida en el archivo .env');
    process.exit(1);  // Detener la aplicación si no hay URI
}

// Conectar a MongoDB usando Mongoose
const conectarDB = async () => {
    try {
        await mongoose.connect(url);  // Eliminadas opciones deprecadas
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);  // Detener la aplicación si hay un error en la conexión
    }
};

module.exports = conectarDB;
