const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Add the database name to the connection string if not already present
    let connectionString = process.env.MONGO_URI;
    if (!connectionString.includes('retryWrites') && !connectionString.includes('w=')) {
      connectionString = connectionString.endsWith('/') 
        ? `${connectionString}GoogleFlightData?retryWrites=true&w=majority`
        : `${connectionString}/GoogleFlightData?retryWrites=true&w=majority`;
    }

    console.log('Connecting to MongoDB...');
    console.log('Connection string:', connectionString.replace(/:([^:]*?)@/, ':***@')); // Hide password in logs
    
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log connection details
    console.log('\n=== MongoDB Connection Details ===');
    console.log(`- Host: ${conn.connection.host}`);
    console.log(`- Port: ${conn.connection.port}`);
    console.log(`- Database: ${conn.connection.name}`);
    console.log(`- Connection State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log('================================\n');

    // List all collections in the database
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    return conn;
  } catch (error) {
    console.error('\n=== MongoDB Connection Error ===');
    console.error(`Error: ${error.message}`);
    console.error('Please check your connection string and ensure MongoDB is running');
    console.error('Current connection string:', process.env.MONGO_URI ? '***' : 'Not set');
    console.error('================================\n');
    process.exit(1);
  }
};

module.exports = connectDB;
