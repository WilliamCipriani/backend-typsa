const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/ContactController');
const LabContactController = require('../controllers/LabContactController');
const { uploadFile } = require('../controllers/UploadController');

router.post('/contact', ContactController.contactFormController)
router.post('/api/contact-new', LabContactController.labContactForm);
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
