const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');

const app = express();
const PORT = 5000; // You can use any port number you prefer

// Connect to MongoDB
mongoose.connect('mongodb+srv://kaichao0424:HlJ6UJgz7A5UcPx6@cluster0.iidtyxi.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/users', usersRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log('hello');


