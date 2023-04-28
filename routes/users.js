const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate request data
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new User document
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET);

    // Return success response
    res.status(201).json({ message: 'User registered successfully', token: token, username });
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate request data
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find user in MongoDB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);

    // Return success response with JWT token
    res.json({ message: 'Login successful', token, username });
  } catch (error) {
    console.error('Failed to login user:', error);
    res.status(500).json({ error: 'Failed to login user' });
  }
});

module.exports = router;
