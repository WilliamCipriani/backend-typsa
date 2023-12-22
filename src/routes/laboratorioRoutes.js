const express = require('express');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorioController');

router.post('/contact-lab', laboratorioController.enviarConsultaLaboratorio);

module.exports = router;
