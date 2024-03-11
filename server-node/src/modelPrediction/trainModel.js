const tf = require('@tensorflow/tfjs-node');
const NivelAgua = require('../models/NivelAguaModel'); 

async function trainModel() {
  // Crear un modelo secuencial
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

  // Compilar el modelo
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  // Obtener los niveles de agua de la base de datos
    const nivelesDeAgua = await NivelAgua.find().sort('timestamp');

  // Entrenar el modelo
    const xs = tf.tensor2d(nivelesDeAgua.map(nivel => nivel.timestamp.getTime()));
    const ys = tf.tensor2d(nivelesDeAgua.map(nivel => nivel.value));
    await model.fit(xs, ys, {epochs: 500});

  // Guardar el modelo
    await model.save("file://./model-trained");
}

trainModel().catch(console.error);