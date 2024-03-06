const express = require('express');
const smsController = require('../controllers/smsController');

const router = express.Router();

router.post('/send-sms', smsController.sendSms);

module.exports = router;