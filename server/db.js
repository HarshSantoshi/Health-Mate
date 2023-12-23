require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const connectToMongoDB= ()=>{
    mongoose.connect(uri);
}
mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB database');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
module.exports = connectToMongoDB;