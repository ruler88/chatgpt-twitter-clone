const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

// Export User model
module.exports = User;
