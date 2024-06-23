// backend/routes/passengerRoutes.js
const express = require('express');
const { requestRide } = require('../controllers/passengerController');
const { verifyToken } = require('../utils/middlewares');
const router = express.Router();

router.post('/request-ride', verifyToken, requestRide);

module.exports = router;
