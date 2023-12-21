const app = require('./src/app');
const { connect } = require('./src/db/mongo'); 

// Define una ruta de prueba
app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

// Función para iniciar la aplicación
async function start() {
    try {
        await connect(); // Establece la conexión a la base de datos
        app.listen(process.env.PORT || 3040, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3040}`);
        });
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        process.exit(1); // Sale de la aplicación si no puede conectarse a la base de datos
    }
}

start()