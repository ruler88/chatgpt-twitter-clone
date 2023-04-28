const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const usersRoute = require('./routes/users');
const Posts = require('./models/posts'); // Import the "Posts" model
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

// Define a route to create a new post
app.post('/createPost', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get the user data from the authenticated request
  const { id: userId, username } = req.user;

  // Get the post content from the request body
  const { content } = req.body;

  // Create a new post using the "Posts" model
  const newPost = new Posts({
    userId,
    username,
    content
  });

  // Save the new post to the database
  newPost.save()
    .then(post => {
      // Send a success response
      res.status(201).json({ message: 'Post created successfully', post });
    })
    .catch(err => {
      // Send an error response
      res.status(500).json({ error: 'Failed to create post' });
    });
});

// Define a route to get the feed
app.get('/feed', (req, res) => {
  // Find the posts from the database, ordered by creation date and limited to 10 posts
  Posts.find()
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .limit(10) // Limit to 10 posts
    .exec()
    .then(posts => {
      // Send the list of posts as a response
      res.status(200).json({ posts });
    })
    .catch(err => {
      // Send an error response
      res.status(500).json({ error: 'Failed to get feed' });
    });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
