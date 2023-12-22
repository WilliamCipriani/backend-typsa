// routes/formularioRoutes.js
const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

router.post('/upload', formularioController.uploadFormulario, formularioController.enviarFormulario);

module.exports = router;
