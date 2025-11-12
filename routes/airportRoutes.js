const express = require('express');
const router = express.Router();
const { searchAirports } = require('../controllers/airportController');

// GET /api/airports?query=searchTerm - Search airports
router.get('/', searchAirports);

module.exports = router;
