// routes/nivelAguaRoutes.js
const express = require('express');
const nivelAguaController = require('../controllers/nivelAguaController');

const router = express.Router();

router.post('/nivel-agua/nuevo', nivelAguaController.crearNivelAgua);

module.exports = router;