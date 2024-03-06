const NivelAgua = require('../models/NivelAguaModel.js');

exports.crearNivelAgua = (req, res) => {
    const { value } = req.body;

    const nuevoNivelAgua = new NivelAgua({ value });

    nuevoNivelAgua.save()
        .then((nivelAgua) => {
            res.status(201).json(nivelAgua);
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: error.message });
        });
};