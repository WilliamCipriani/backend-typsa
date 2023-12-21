const nodemailer = require('nodemailer');
const transporter = require('../mail/transporter');

const sendEmail = async (data) => {
    try {
        const mailOptions = {
            from: 'typsa_reservas@gmail.com',
            to: 'rhperu@typsa.es',
            subject: 'Nuevo envío de formulario',
            text: `
                Nombre: ${data.name}
                Email: ${data.email}
                Teléfono: ${data.phone}
                Empresa: ${data.company}
                Mensaje: ${data.message}
            `,
        };
            await transporter.sendMail(mailOptions);
            console.log('Correo electrónico enviado correctamente');
          // Envía una respuesta al cliente
            res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
        } catch (error) {
            console.error('Error al procesar el formulario de contacto:', error);
            res.status(500).json({ message: 'Error al procesar el formulario de contacto' });
        }
};

const contactFormController = async (req, res) => {
    try {
        const { name, email, phone, company, message, option } = req.body;
        let toEmail = 'rhperu@typsa.es, typsaperu@typsa.com';

        const mailOptions = {
            from: 'typsa_reservas@gmail.com',
            to: toEmail,
            subject: `${option}`,
            html: `
            <p>Se ha recibido un nuevo mensaje a través del formulario de contacto. Los detalles son los siguientes: </p>
            <ul>
                <li><strong>Nombre: </strong> ${name}</li>
                <li><strong>Email: </strong> ${email}</li>
                <li><strong>Teléfono </strong> ${phone}</li>
                <li><strong>Empresa: </strong> ${company}</li>
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



module.exports = {
    sendEmail,
    contactFormController,
    anotherContactFormController
};
