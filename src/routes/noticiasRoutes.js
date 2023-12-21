const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');


router.get('/', async (req, res) => {
    try {
        const approvedNoticias = await Noticia.find({ isApproved: true });
        res.json(approvedNoticias);
    } catch (error) {
        res.status(500).send('Error al obtener noticias: ' + error.message);
    }
});

router.get('/noticias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.findOne({ id: id });

        if (!noticia) {
            return res.status(404).send('Noticia no encontrada');
        }

        res.json(noticia);
    } catch (error) {
        console.error("Error al obtener la Noticia: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para crear un nuevo documento
router.post('/', async (req, res) => {
    try {
        const newNoticia = new Noticia(req.body);
        await newNoticia.save();
        res.json(newNoticia);
    } catch (error) {
        console.error("Error al crear noticia: ", error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para obtener las noticias pendientes de aprobación
router.get('/pending', async (req, res) => {
    try {
        const pendingNoticias = await Noticia.find({ isApproved: false });
        res.json(pendingNoticias);
    } catch (error) {
        res.status(500).send('Error al obtener noticias pendientes: ' + error.message);
    }
});

// Ruta para actualizar un documento de false a true
router.put('/approve/:id', async (req, res) => {
    try {
        const newsId = req.params.id;
        const updatedNoticia = await Noticia.findOneAndUpdate({ id: newsId }, { isApproved: true }, { new: true });

        if (!updatedNoticia) {
            return res.status(404).send('Noticia no encontrada');
        }

        res.json(updatedNoticia);
    } catch (error) {
        res.status(500).send('Error al aprobar la noticia: ' + error.message);
    }
});

// Ruta para actualizar una toda noticia
router.put('/update/:id', async (req, res) => {
    try {
        const newsId = req.params.id;
        const data = req.body;

        // Actualiza la noticia usando findOneAndUpdate
        const updatedNoticia = await Noticia.findOneAndUpdate({ id: newsId }, data, { new: true });

        if (!updatedNoticia) {
            return res.status(404).send('Noticia no encontrada');
        }

        res.json(updatedNoticia);
    } catch (error) {
        res.status(500).send('Error al actualizar la noticia: ' + error.message);
    }
});

// Ruta para eliminar un documento
router.delete('/:id', async (req, res) => {
    try {
        const newsId = req.params.id;
        const deleteNoticia = await Noticia.findOneAndDelete({ id: newsId });

        if (!deleteNoticia) {
            return res.status(404).send('La noticia no se encuentra para eliminar');
        }

        res.json({ message: 'Noticia eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar la noticia: ", error);
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router;