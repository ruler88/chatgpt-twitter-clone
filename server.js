const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const usersRoute = require('./routes/users');
const { JWT_SECRET } = require('./config');

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

// Define a Passport JWT strategy
const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
  // Verify the payload (decoded data)
  // In this example, assuming the payload contains user information
  // You can customize this part based on your JWT payload structure
  const user = {
    id: payload.userId,
    username: payload.username,
  };

  // Pass the user to the next middleware or route handler
  return done(null, user);
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize()); // Initialize Passport middleware

// Routes
app.use('/users', usersRoute);

// Define a route for token verification
app.get('/api/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  // User is authenticated and available as `req.user` object
  // You can access user data as needed
  console.log(req.user);
  return res.json(req.user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
