const tf = require('@tensorflow/tfjs');

exports.makePrediction = async (req, res) => {
    const userInputDate = req.body.date;

    // Cargar el modelo
    const model = await tf.loadLayersModel('file://./model-trained/model.json');

    // Convertir la entrada del usuario a un tensor
    const input = tf.tensor2d([new Date(userInputDate).getTime()]);

    // Realizar la predicción
    const prediction = model.predict(input);

    // Enviar la predicción como respuesta
    res.json({ prediction: prediction.dataSync() });
};