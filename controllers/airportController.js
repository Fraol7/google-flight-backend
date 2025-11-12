const axios = require('axios');

// @desc    Search airports
// @route   GET /api/airports
// @access  Public
const searchAirports = async (req, res) => {
  try {
    const { query = '' } = req.query;
    
    if (!query.trim()) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      params: {
        query,
        locale: 'en-US'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching airports:', error);
    
    let statusCode = 500;
    let message = 'Server Error';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      statusCode = error.response.status;
      message = error.response.data?.message || 'API request failed';
    } else if (error.request) {
      // The request was made but no response was received
      message = 'No response from the airport service';
    }
    
    res.status(statusCode).json({ 
      message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  searchAirports
};
