require('dotenv').config();
require('./connectionDB.js');

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const smsRoutes = require('./routes/smsRoutes');
const nivelAguaRoutes = require('./routes/nivelAguaRoutes');
const predictRoutes = require('./routes/predictRoutes');

const app = express();

app.disable('x-powered-by'); // Disable the X-Powered-By header in responses

app.use(express.json()); // Middleware to parse JSON bodies

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies

const PORT = process.env.PORT ?? 3000;

// PARA HACER UN POST A ESTE ENDPOINT SE DEBE ENVIAR UN JSON CON EL SIGUIENTE FORMATO
// { "to": "+123456789", "body": "Hello, World!" }
// SE PUEDE ENVIAR MENSAJES A CUALQUIER NUMERO DE TELEFONO
app.use('/api', smsRoutes);

// Rutas para el modelo NivelAgua
app.use('/api', nivelAguaRoutes);

//Rutas para predecir el nivel de agua
app.use('/api', predictRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});