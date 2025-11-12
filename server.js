require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flightRoutes');
const airportRoutes = require('./routes/airportRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/airports', airportRoutes);
app.use('/api/flights', flightRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Google Flights Clone API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
