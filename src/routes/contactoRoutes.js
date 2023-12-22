// routes/contactoRoutes.js
const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.post('/contact', contactoController.enviarMensajeContacto);

module.exports = router;
