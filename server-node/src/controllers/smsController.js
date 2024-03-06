const twilio = require('twilio');
const NivelAgua = require('../models/NivelAguaModel');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// PARA HACER UN POST A ESTE ENDPOINT SE DEBE ENVIAR UN JSON CON EL SIGUIENTE FORMATO
// { "to": "+123456789", "body": "Hello, World!" }
// SE PUEDE ENVIAR MENSAJES A CUALQUIER NUMERO DE TELEFONO
exports. sendSms = async (req, res) => {
    const to = req.body.to || process.env.TO_NUMBER; // Utilizar 'to' del cuerpo de la solicitud o 'TO_NUMBER' de las variables de entorno
    const umbralCritico = 10;

        // Obtener el último nivel de agua de la base de datos
        const nivelDeAguaActual = await NivelAgua.getUltimoNivel();

    if (!to) {
        res.status(400).send('Missing "to" parameter');
        return;
    }

    if ((nivelDeAguaActual.value) < umbralCritico) {
        const mensajeAlerta = `El nivel de agua es crítico: ${nivelDeAguaActual.value} metros`;	

        client.messages.create({
            body: mensajeAlerta,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER
        }).then(()=> {
            res.status(201).send('SMS sent successfully');
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Error sending SMS');
        });
    }else{
        // Si el nivel de agua no es crítico, puede optar por no enviar un mensaje o enviar un estado diferente
        res.status(200).send('Nivel de agua normal');
    }

};
