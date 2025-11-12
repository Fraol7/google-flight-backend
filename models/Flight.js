const mongoose = require('mongoose');

const flightScheduleSchema = new mongoose.Schema({
  airport: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3
  },
  scheduledDate: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  scheduledTime: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  }
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
    trim: true
  },
  flightNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  departure: {
    type: flightScheduleSchema,
    required: true
  },
  arrival: {
    type: flightScheduleSchema,
    required: true
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
      uppercase: true,
      length: 3
    }
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'cancelled', 'departed', 'arrived'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
