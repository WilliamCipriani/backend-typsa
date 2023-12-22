const multer = require('multer');
const transporter = require('../mail/transporter');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadFormulario = upload.single('file');


exports.enviarFormulario = (req, res) => {
    const { email, name, fromEmail, ...otrosDatos } = req.body;
    const file = req.file; // El archivo estará en req.file.buffer.
  
    const mailOptions = {
      from: fromEmail,
      to: 'wciprianinaveda@gmail.com', // o una dirección de correo fija
      subject: 'Nuevo formulario recibido',
      text: `Detalles del formulario:\nNombre: ${name}\n...`, // Agrega más detalles según sea necesario
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer
        }
      ]
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al enviar el correo', error });
      }
      console.log('Email enviado:', info.response);
      return res.status(200).json({ message: 'Correo enviado con éxito', info });
    });
  };