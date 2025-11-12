const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Flight = require('../models/Flight');
const connectDB = require('./db');

dotenv.config();

const mockFlights = [
  {
    airline: 'Delta Airlines',
    flightNumber: 'DL123',
    departure: {
      airport: 'JFK',
      scheduledDate: '2025-12-15',
      scheduledTime: '08:30'
    },
    arrival: {
      airport: 'LAX',
      scheduledDate: '2025-12-15',
      scheduledTime: '11:45'
    },
    price: {
      amount: 299.99,
      currency: 'USD'
    },
    availableSeats: 120,
    status: 'scheduled'
  },
  {
    airline: 'American Airlines',
    flightNumber: 'AA456',
    departure: {
      airport: 'LAX',
      scheduledDate: '2025-12-16',
      scheduledTime: '14:00'
    },
    arrival: {
      airport: 'ORD',
      scheduledDate: '2025-12-16',
      scheduledTime: '20:15'
    },
    price: {
      amount: 249.99,
      currency: 'USD'
    },
    availableSeats: 85,
    status: 'scheduled'
  },
  {
    airline: 'United Airlines',
    flightNumber: 'UA789',
    departure: {
      airport: 'ORD',
      scheduledDate: '2025-12-17',
      scheduledTime: '09:45'
    },
    arrival: {
      airport: 'JFK',
      scheduledDate: '2025-12-17',
      scheduledTime: '12:30'
    },
    price: {
      amount: 199.99,
      currency: 'USD'
    },
    availableSeats: 65,
    status: 'scheduled'
  }
];

const seedFlights = async () => {
  try {
    await connectDB();
    
    // Clear existing flights
    await Flight.deleteMany({});
    console.log('Cleared existing flight data');
    
    // Insert mock flights
    const createdFlights = await Flight.insertMany(mockFlights);
    console.log(`Seeded ${createdFlights.length} flights`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding flights:', error);
    process.exit(1);
  }
};

seedFlights();
