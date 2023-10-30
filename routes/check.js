const express = require('express');
const router = express.Router();
const checkController = require('../controllers/checkController');

router.post('/check-in', checkController.checkIn);
router.post('/check-out', checkController.checkOut);

module.exports = router;