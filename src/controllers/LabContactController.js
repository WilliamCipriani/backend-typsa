const transporter = require('../mail/transporter');

const labContactForm = async (req, res) => {
    try {
        const { name, email, asunto, message } = req.body;
        const mailOptions = {
            from: 'typsa_reservas@gmail.com',
            to: 'labperu@typsa.es',
            subject: `${asunto}`,
            html:`
                    <p>Se ha recibido un nuevo mensaje a través del formulario de contacto. Los detalles son los siguientes: </p>
                    <ul>
                        <li><strong>Nombre: </strong> ${name}</li>
                        <li><strong>Email: </strong> ${email}</li>
                    </ul>
                    <p><strong>Mensaje:</strong></p>
                    <p> ${message}</p>
                `,
        };
        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado correctamente');
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
        console.error('Error al procesar el formulario de contacto:', error);
        res.status(500).json({ message: 'Error al procesar el formulario de contacto' });
    }
};

module.exports = { labContactForm };
