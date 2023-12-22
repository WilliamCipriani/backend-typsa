// controllers/laboratorioController.js
const transporter = require('../mail/transporter');

exports.enviarConsultaLaboratorio = async (req, res) => {
  const { name, email, asunto, message } = req.body;
  
  // Aquí puedes realizar validaciones adicionales si es necesario.

  const mailOptions = {
    from: email, // Email del usuario que llenó el formulario.
    to: 'wciprianinaveda@gmail.com', // Cambia esto por tu correo de recepción real.
    subject: `Consulta Laboratorio - ${asunto}`,
    text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${asunto}\nMensaje:\n${message}`,
    // También puedes usar HTML para formatear mejor el correo.
    // html: `<p>${message}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Consulta de laboratorio enviada: %s', info.messageId);
    res.status(200).json({ message: 'Su consulta ha sido enviada con éxito.' });
  } catch (error) {
    console.error('Error al enviar consulta de laboratorio:', error);
    res.status(500).json({ message: 'Error al enviar su consulta.', error });
  }
};
