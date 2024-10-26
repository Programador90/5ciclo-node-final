const Marca = require('../models/Marca'); // Modelo de marca

// Obtener todas las marcas
exports.getMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las marcas', error });
    }
};

// Obtener una marca por ID
exports.getMarcaById = async (req, res) => {
    try {
        const marca = await Marca.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json(marca);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la marca', error });
    }
};

// Crear una nueva marca
exports.createMarca = async (req, res) => {
    try {
        const { nombre_marca } = req.body;

        const nuevaMarca = new Marca({ nombre_marca });
        await nuevaMarca.save();
        res.json({ message: 'Marca creada correctamente', nuevaMarca });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la marca', error });
    }
};

// Actualizar una marca existente
exports.updateMarca = async (req, res) => {
    try {
        const { nombre_marca } = req.body;

        const marca = await Marca.findByIdAndUpdate(req.params.id, { nombre_marca }, { new: true });
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }

        res.json({ message: 'Marca actualizada', marca });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la marca', error });
    }
};

// Eliminar una marca
exports.deleteMarca = async (req, res) => {
    try {
        const marca = await Marca.findByIdAndDelete(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }

        res.json({ message: 'Marca eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la marca', error });
    }
};
