const express = require('express')
const router = express.Router()
const RinconGourmet = require('../models/RinconGourmet')

// Ruta para obtener todos los documentos
router.get('/rincongourmets', async (req, res) => {
    try {
        const gourmets = await RinconGourmet.find({});
        res.json(gourmets);
    } catch (error) {
        console.error("Error al obtener los Rincón Gourmet: ", error);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/rincongourmets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gourmet = await RinconGourmet.findOne({ id: id });

        if (!gourmet) {
            return res.status(404).send('Rincon Gourmet no encontrado');
        }

        res.json(gourmet);
    } catch (error) {
        console.error("Error al obtener el Rincon Gourmet: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para crear un nuevo documento
router.post('/rincongourmets', async (req, res) => {
    try {
        const newGourmet = new RinconGourmet(req.body);
        await newGourmet.save();
        res.json(newGourmet);
    } catch (error) {
        console.error("Error al crear Rincon Gourmet: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para actualizar un documento
router.put('/rincongourmets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gourmet = await RinconGourmet.findOneAndUpdate({ id: id }, req.body, { new: true });

        if (!gourmet) {
            return res.status(404).send('Rincon Gourmet no encontrado para actualizar');
        }

        res.json(gourmet);
    } catch (error) {
        console.error("Error al actualizar Rincon Gourmet: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar un documento
router.delete('/rincongourmets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gourmet = await RinconGourmet.findOneAndDelete({ id: id });

        if (!gourmet) {
            return res.status(404).send('Rincon Gourmet no encontrado para eliminar');
        }

        res.json({ message: 'Rincon Gourmet eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar Rincon Gourmet: ", error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;