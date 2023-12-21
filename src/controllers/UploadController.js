const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const { name, email, dni, telefono, provincia, especialidad, message } = req.body;
    
        // Configura y envía el correo electrónico usando nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
            }
        });

        let mailOptions = {
            from: 'typsa.reserva@gmail.com',
            to: 'rhperu@typsa.es',
            subject: 'Nuevo CV de ' + name,
            text: `
                El usuario ${name} con email ${email} ha enviado su CV.
                DNI: ${dni}
                Teléfono: ${telefono}
                Provincia: ${provincia}
                Especialidad: ${especialidad}
                Mensaje:
                ${message}
            `,
            attachments: [{
                filename: file.originalname,
                content: file.buffer
            }]
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado" });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    }
};

module.exports = { uploadFile };
