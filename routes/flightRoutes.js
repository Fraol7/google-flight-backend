const express = require('express');
const router = express.Router();
const { getFlights } = require('../controllers/flightController');

// GET /api/flights - Get all flights
router.get('/', getFlights);

module.exports = router;