const NivelAgua = require('../models/NivelAguaModel.js');

let nivelAguaAnterior = null;

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
        }
    };
};