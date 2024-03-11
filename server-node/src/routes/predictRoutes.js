const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');

router.post('/nivel-agua/predict', predictionController.makePrediction);

module.exports = router;