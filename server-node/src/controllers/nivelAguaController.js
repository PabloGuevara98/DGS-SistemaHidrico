const NivelAgua = require('../models/NivelAguaModel.js');
const { enviarAlertaConsumoExcesivo } = require('./smsController.js');

let nivelAguaAnterior = null;

// Constante para el limite de consumo de agua para enviar alerta

const LIMITE_CONSUMO_ALERTA = 1000;

module.exports = function(io) {
    return {
        crearNivelAgua: (req, res) => {
            const { value } = req.body;

            let consumption = 0;
            if (nivelAguaAnterior !== null) {
                consumption = nivelAguaAnterior.value - value;
            }
            nivelAguaAnterior = value;
    
            const nuevoNivelAgua = new NivelAgua({ value });
    
            nuevoNivelAgua.save()
            .then((nivelAgua) => {
                // Emite un evento de WebSocket con los datos del nuevo documento
                io.emit('nivelAgua', nivelAgua);
                res.status(201).json(nivelAgua);
            })
            .catch((error) => {
                console.error('Error inserting data:', error);
                res.status(500).json({ error: error.message });
            });
        },
        obtenerDistribucion: (req, res) => {
            NivelAgua.find({})
                .then((nivelesAgua) => {
                    if (!nivelesAgua || nivelesAgua.length === 0) {
                        return res.status(404).json({ message: 'No hay niveles de agua disponibles.' });
                    }
        
                    // Calcular el consumo total de agua
                    const consumoTotal = nivelesAgua.reduce((total, nivelAgua, index) => {
                        if (index === 0 || typeof nivelAgua.value !== 'number' || nivelAgua.value < 0) {
                            return total;
                        }
                        return total + (nivelesAgua[index - 1].value - nivelAgua.value);
                    }, 0);
        
                    if (consumoTotal > LIMITE_CONSUMO) {
                        enviarAlertaConsumoExcesivo();
                    }
        
                    // Calcular la distribución del consumo de agua
                    // Esto dependerá de cómo esté estructurada tu aplicación
                    const distribucion = calcularDistribucion(consumoTotal);
        
                    res.status(200).json(distribucion);
                })
                .catch((error) => {
                    console.error('Error retrieving data:', error);
                    res.status(500).json({ error: error.message });
                });
        }
        
    };
};

// Función para calcular la distribución del consumo de agua para las comunidades 
const calcularDistribucion = (consumoTotal) => {
    // Implementa la lógica para dividir el consumo total entre las diferentes áreas o usuarios
    // Esto dependerá de cómo esté estructurada tu aplicación
    // Por ejemplo, si tienes un objeto que representa las diferentes áreas y su porcentaje de uso, podrías hacer algo como esto:
    const areas = {
      area1: 0.2, // 20% del consumo total
      area2: 0.3, // 30% del consumo total
      area3: 0.5  // 50% del consumo total
    };

    let distribucion = {};

    for (let area in areas) {
      distribucion[area] = consumoTotal * areas[area];
    }

    return distribucion;
};
