const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const noticiasRoutes = require('./routes/noticiasRoutes')
const articulosRoutes = require('./routes/articulosRoutes')
const rinconGourmetsRoutes = require('./routes/rinconGourmetsRoutes')
const downloadRoutes = require('./routes/downloadRoutes');

const app = express();

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(downloadRoutes);
app.use('/api/noticias', noticiasRoutes)
app.use('/api/articulos',articulosRoutes)
app.use('/api/',rinconGourmetsRoutes)


module.exports = app;
