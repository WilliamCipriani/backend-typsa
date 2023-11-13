const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/descargar-pdf/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const ubicacionArchivo = path.join(__dirname, 'downloads', nombreArchivo);

    res.download(ubicacionArchivo, nombreArchivo, (err) => {
        if (err) {
            // Manejar error, archivo no encontrado, etc.
            res.status(404).send("Archivo no encontrado");
        }
    });
});

module.exports = router;
