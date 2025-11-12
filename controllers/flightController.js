const mongoose = require('mongoose');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
const getFlights = async (req, res) => {
  try {
    // Get the database connection
    const db = mongoose.connection.db;
    
    // Access the 'flights' collection directly
    const flights = await db.collection('flights').find({}).toArray();
    
    if (!flights || flights.length === 0) {
      return res.status(404).json({ 
        message: 'No flights found',
        details: 'The flights collection is empty or does not exist'
      });
    }
    
    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ 
      message: 'Error fetching flights from database',
      error: error.message
    });
  }
};

module.exports = {
  getFlights
};
