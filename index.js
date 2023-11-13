//Importamos los modulos necesarios
const cors = require("cors");
const express = require('express');
const downloadRoutes = require('./downloadRoutes');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer  = require('multer');




//JSON
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = process.env.PORT || 3040;

//Creamos una instancia de Express
var app = express();

//Configuramos el middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

app.use(downloadRoutes);
const usuariosFilePath = path.join(__dirname, 'usuarios.json');
const usuariosData = fs.readFileSync(usuariosFilePath);
const usuarios = JSON.parse(usuariosData);


//Conectamos a la base de datos MySQL
const connection = mysql.createConnection ({
  host:'127.0.0.1',
  user:'root',
  password:'',
  database:'typsa'
});

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Si utilizas SSL/TLS, cambia a true
    auth: {
      user: 'typsa.reserva@gmail.com',
      pass: 'krqpyqyixcajmjxf',
    },
  });


//Definimos una funcion para ejecutar consultas SQL
/*connection.connect(function(err){
    if(err){
        return console.error('error : '+ err.message);
    }

    console.log('Connected as id ' + connection.threadId);
    
});
*/



//Definimos una ruta para obtener todos los usuarios
/*
app.get('/usuarios', function (req, res) { 
   try {
        const usuarios =  connection.query('SELECT * FROM usuarios');
        res.json(usuarios);
   } catch (error) {
        res.status(500).json({mensaje:' ERROR AL OBTENER LOS USUARIOS', error});
   }
});
*/


app.get('/usuarios', function (req, res) { 
  try {
    const usuariosData = fs.readFileSync(usuariosFilePath);
    const usuarios = JSON.parse(usuariosData);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'ERROR AL OBTENER LOS USUARIOS', error });
  }
});


// Ruta raíz
app.get('/', function(req, res) {
  res.send('¡La aplicación está funcionando correctamente!');
});

/*

app.post('/auth', function(req, res) {
	
	let username = req.body.username;
	let password = req.body.password;
    
	
	if (username && password) {
		
		connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			
			if (error) throw error;
			
			if (results.length > 0) {
				
				res.json({
                    ok:true,
                    msj: 'Inicio session',
                    id:results[0].id
                })
				
			} else {
				res.send({
                    msj: 'Usuario y/o Contraseña Incorrecta'
                });
			}			
			res.end();
		});
	} else {
		res.send('Por favor ingresa Usuario y Contraseña!');
		res.end();
	}
});
*/

// USA ELL USUARIOS.JSON PARA LEGEARSE
app.post('/auth', function(req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const user = usuarios.find((user) => user.username === username && user.password === password);
    if (user) {
      res.json({ ok: true, msj: 'Inicio sesión', id: user.id });
    } else {
      res.json({ msj: 'Usuario y/o Contraseña Incorrecta' });
    }
  } else {
    res.status(400).json({ msj: 'Por favor ingresa Usuario y Contraseña!' });
  }
});



const sendEmail = async (data) => {
    try {
        const mailOptions = {
            from: 'typsa_reservas@gmail.com',
            to: 'wjcipriani@typsa.es',
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
  
  
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, company, message, option } = req.body;

    let toEmail;

    // Define el correo electrónico al que enviar el formulario según la opción seleccionada
    if (option === 'Consultas') {
        toEmail = 'wjcipriani@typsa.es';
      //toEmail = 'rhperu@typsa.es';
    } else {
        toEmail = 'wciprianinaveda@gmail.com';
      //toEmail = 'rhperu@typsa.es, typsaperu@typsa.com'; // correo por defecto si ninguna opción coincide
    }
  
      // Realiza cualquier validación adicional de los datos del formulario si es necesario
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Company:', company);
        console.log('Message:', message);
        console.log('Option:', option);
      // Envía el correo electrónico
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
  
      // Envía una respuesta al cliente
      res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
      console.error('Error al procesar el formulario de contacto:', error);
      res.status(500).json({ message: 'Error al procesar el formulario de contacto' });
    }
  });

  // Controlador de formulario de contacto
const contactFormController = async (req, res) => {
    try {
      // Procesa los datos del formulario recibidos en req.body
      const { name, email, phone, company, message } = req.body;

      // Realiza cualquier validación adicional de los datos del formulario si es necesario
        if (!name || !email || !message) {
            throw new Error('Faltan campos requeridos en el formulario');
        }
      // Envía el correo electrónico
      await sendEmail(req.body);
  
      // Envía una respuesta al cliente
      res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
      console.error('Error al procesar el formulario de contacto:', error);
      res.status(500).json({ message: 'Error al procesar el formulario de contacto' });
    }
  };


//FORMULARIO LABORATORIO:
const NEW_EMAIL_RECIPIENT = 'labperu@typsa.es';

app.post('/api/contact-new', async (req, res) => {
  try {
      const { name, email, asunto, message } = req.body;
      const mailOptions = {
          from: 'typsa_reservas@gmail.com',
          to: NEW_EMAIL_RECIPIENT,
          subject: `${asunto}`,
          html: `
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
});


app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const name = req.body.name;
  const email = req.body.email;
  const dni = req.body.dni;
  const telefono = req.body.telefono;
  const provincia = req.body.provincia;
  const especialidad = req.body.especialidad;
  const message = req.body.message;
  
  // Configura y envía el correo electrónico usando nodemailer
  let transporter = nodemailer.createTransport({
      // Configuración del transporte (ejemplo con Gmail)
      service: 'gmail',
      auth: {
        user: 'typsa.reserva@gmail.com',
        pass: 'krqpyqyixcajmjxf',
      }
  });

  let mailOptions = {
      from: 'typsa.reserva@gmail.com',
      to: 'wjcipriani@typsa.es',
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    } else {
        res.status(200).json({ message: "Correo enviado" });
    }
  });
});

app.listen(port, function() {
    console.log(`Server started on port ${port}`);
})