const express = require('express');
const router = express.Router();

router.post('/nivel-agua/nuevo', (req, res) => {
    const nivelAguaController = require('../controllers/nivelAguaController')(req.io);
    nivelAguaController.crearNivelAgua(req, res);
});

module.exports = router;