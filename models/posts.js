const mongoose = require('mongoose');

// Define the "Posts" schema
const postsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  }
});

// Create and export the "Posts" model
const Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;
