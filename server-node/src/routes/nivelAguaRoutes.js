const express = require('express');
const router = express.Router();

router.post('/nivel-agua/nuevo', (req, res) => {
    const nivelAguaController = require('../controllers/nivelAguaController')(req.io);
    nivelAguaController.crearNivelAgua(req, res);
});

router.get('/nivel-agua/distribucion', (req, res) => {
    const nivelAguaController = require('../controllers/nivelAguaController')(req.io);
    nivelAguaController.obtenerDistribucion(req, res);
});

module.exports = router;