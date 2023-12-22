const transporter = require('../mail/transporter');

exports.enviarMensajeContacto = async (req, res) => {
  const { name, email, phone, company, message, option } = req.body;

  const mailOptions = {
    from: email, // El correo del usuario que se utilizará en el campo 'from'
    to: 'wciprianinaveda@gmail.com', // El correo electrónico donde quieres recibir los mensajes de contacto
    subject: `Nuevo mensaje de contacto de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nEmpresa: ${company}\nOpción: ${option}\nMensaje:\n${message}`,
   
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Mensaje enviado: %s', info.messageId);
    return res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar mensaje de contacto:', error);
    return res.status(500).json({ message: 'Error al enviar el mensaje.', error });
  }
};
