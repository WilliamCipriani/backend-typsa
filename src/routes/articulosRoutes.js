const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');


router.get('/', async (req, res) => {
    try {
        const approvedArticulos = await Articulo.find({ isApproved: true });;
        res.json(approvedArticulos);
    } catch (error) {
        res.status(500).send("Error al obtener las noticias: " + error.message);
    }
});

router.get('/articulos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Articulo.findOne({ id: id });

        if (!articulo) {
            return res.status(404).send('Articulo no encontrada');
        }

        res.json(articulo);
    } catch (error) {
        console.error("Error al obtener la Articulo: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para crear un nuevo documento
router.post('/', async (req, res) => {
    try {
        const newArticulo = new Articulo(req.body);
        await newArticulo.save();
        res.json(newArticulo);
    } catch (error) {
        console.error("Error al crear articulo: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener las articulos pendientes de aprobación
router.get('/pending', async (req, res) => {
    try {
        const pendingArticulo = await Articulo.find({ isApproved: false });
        res.json(pendingArticulo);
    } catch (error) {
        res.status(500).send('Error al obtener Articulo pendientes: ' + error.message);
    }
});

// Ruta para actualizar un documento de false a true
router.put('/approve/:id', async (req, res) => {
    try {
        const articuloId = req.params.id;
        const updatedArticulo = await Articulo.findOneAndUpdate({ id: articuloId }, { isApproved: true }, { new: true });

        if (!updatedArticulo) {
            return res.status(404).send('Articulo no encontrado');
        }

        res.json(updatedArticulo);
    } catch (error) {
        res.status(500).send('Error al aprobar el articulo: ' + error.message);
    }
});

// Ruta para eliminar un documento
router.delete('/:id', async (req, res) => {
    try {
        const articuloId = req.params.id;
        const deleteArticulo = await Articulo.findOneAndDelete({ id: articuloId });

        if (!deleteArticulo) {
            return res.status(404).send('El articulo no se encuentra para eliminar');
        }

        res.json({ message: 'Articulo eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar la articulo: ", error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;